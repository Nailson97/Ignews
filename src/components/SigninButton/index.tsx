import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";

export function SigninButton() {
  const userLoggeding = true;

  return userLoggeding ? (
    <button className={styles.signinButton} type="button">
      <FaGithub color="#04d361" />
      Diego Fernandes
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button className={styles.signinButton} type="button">
      <FaGithub color="#eba417" />
      Signig in with Github
    </button>
  );
}
