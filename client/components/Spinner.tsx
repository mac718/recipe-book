import { Backdrop } from "./Modal";
import styles from "./styles/Spinner.module.css";

const Spinner = () => {
  return (
    <>
      <Backdrop onClose={() => {}} />
      <div className={styles.spinner}></div>;
    </>
  );
};

export default Spinner;
