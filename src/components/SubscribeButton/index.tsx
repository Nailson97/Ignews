import { useSession, signIn } from "next-auth/react";
import styles from "./styles.module.scss";

interface subsribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: subsribeButtonProps) {
  const { data: session } = useSession();

  function subscrible() {
    if (!session) {
      signIn("github");
      return;
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
