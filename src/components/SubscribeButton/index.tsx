import styles from "./styles.module.scss";

interface subsribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: subsribeButtonProps) {
  return (
    <button className={styles.subscribeButton} type="button">
      Subcribe now
    </button>
  );
}
