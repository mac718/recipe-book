import axios from "axios";
import styles from "./styles/DeleteWarning.module.css";

type DeleteWarningProps = {
  name: string;
};

const DeleteWarning = ({ name }: DeleteWarningProps) => {
  console.log("rec name", name);
  const handleDeleteRecipe = async () => {
    console.log("hello from delete");
    try {
      await axios.delete(`http://localhost:8000/${name}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.content}>
      Are you sure you want to delete this recipe? If you select yes, it cannot
      be recovered
      <div>
        <button className={styles.yes} onClick={handleDeleteRecipe}>
          yes
        </button>
        <button className={styles.cancel}>cancel</button>
      </div>
    </div>
  );
};

export default DeleteWarning;
