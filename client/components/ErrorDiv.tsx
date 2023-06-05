import styles from "./styles/Error.module.css";

type ErrorDivProps = {
  msg: string;
};

const ErrorDiv = ({ msg }: ErrorDivProps) => {
  return <div className={styles.err}>{msg}</div>;
};

export default ErrorDiv;
