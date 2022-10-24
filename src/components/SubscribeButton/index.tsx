import { useSession, signIn } from "next-auth/react";
import { api } from "../../services/api";
import { getSripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

interface subsribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: subsribeButtonProps) {
  const { data: session } = useSession();

  async function subscrible() {
    if (!session) {
      signIn("github");
      return;
    }

    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getSripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button
      className={styles.subscribeButton}
      type="button"
      onClick={subscrible}
    >
      Subcribe now
    </button>
  );
}
