import { query as q } from "faunadb";

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { fauna } from "../../../services/fauna";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "read:user",
        },
      },
    }),
  ],
  callbacks: {
    async session({session}) {
      try {
        const userActiveSubscription = await fauna.query<string>(
          q.Get(
           q.Intersection([
            q.Match(
              q.Index('subscription_by_user_ref'),
              q.Select(
                "ref",
                q.Get(
                  q.Match(
                    q.Index('user_by_email'),
                     q.Casefold(String(session?.user?.email))
                    )
                   )
                  )
                 ),
                q.Match(
                 q.Index('subscription_by_status'),
                 "active"
               )
            ])
          )
        )
        return {
          ...session,
          activeSubscription: userActiveSubscription
        }
      } catch (err) {
        console.log(err, 'erro no catch')
        return {
          ...session,
          activeSubscription: null,
        }
      }
    },
     async signIn({ user, account, profile, email, credentials }) {
      try {
        await fauna.query(
          q.Let(
            {
              userExists: q.Exists(
                q.Match(q.Index("user_by_email"), q.Casefold(user.email))
              ),
            },
            q.If(
              q.Var("userExists"),
              q.Get(q.Match(q.Index("user_by_email"), q.Casefold(user.email))),
              q.Create(q.Collection("users"), {
                data: { email: user.email },
              })
            )
          )
        );
        return true;
      } catch {
        return false;
      }
    },
  },
});
