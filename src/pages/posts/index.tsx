import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href='#'>
            <time> 16 de novembro de 2022</time>
            <strong>Creating new World</strong>
            <p>
              ReactJS is an open-source JavaScript library that first made an
              official appearance in 2013. It was developed by Facebook with the
              sole objective of creating rich, value-loaded, and engaging web.
            </p>
          </a>

          <a href='#'>
            <time> 16 de novembro de 2022</time>
            <strong>Creating new World</strong>
            <p>
              ReactJS is an open-source JavaScript library that first made an
              official appearance in 2013.It was developed by Facebook with the
              sole objective of creating rich, value-loaded, and engaging web.
            </p>
          </a>

          <a href='#'>
            <time> 16 de novembro de 2022</time>
            <strong>Creating new World</strong>
            <p>
              ReactJS is an open-source JavaScript library that first made an
              official appearance in 2013. It was developed by Facebook with the
              sole objective of creating rich, value-loaded, and engaging web.
            </p>
          </a>
        </div>
      </main>
    </>
  ); 
}

export async function getServerSideProps() {
  const prismic = getPrismicClient()

  const posts = await prismic.getByType("publication", {
    pageSize: 100,
  });

  console.log(JSON.stringify(posts, null, 2));
  
  return {
    props: { posts },
  };
}
