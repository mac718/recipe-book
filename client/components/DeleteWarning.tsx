import axios from "axios";
import styles from "./styles/DeleteWarning.module.css";

type DeleteWarningProps = {
  name: string;
  getRecipes: () => void;
  onClose: () => void;
};

const DeleteWarning = ({ name, getRecipes, onClose }: DeleteWarningProps) => {
  const handleDeleteRecipe = async () => {
    try {
      await axios.delete(`http://localhost:8000/${name}`);
      onClose();
      getRecipes();
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
