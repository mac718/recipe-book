import styles from "./styles/DeleteWarning.module.css";

const DeleteWarning = () => {
  return (
    <div className={styles.content}>
      Are you sure you want to delete this recipe? If you select yes, it cannot
      be recovered
      <div>
        <button className={styles.yes}>yes</button>
        <button className={styles.cancel}>cancel</button>
      </div>
    </div>
  );
};

export default DeleteWarning;
