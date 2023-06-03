import axios from "axios";
import styles from "./styles/DeleteWarning.module.css";

type DeleteWarningProps = {
  id: string;
  getRecipes: () => void;
  onClose: () => void;
};

const DeleteWarning = ({ id, getRecipes, onClose }: DeleteWarningProps) => {
  console.log("id", id);
  const handleDeleteRecipe = async () => {
    try {
      await axios.delete(`http://localhost:8000/recipes/${id}`);
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
        <button className={styles.cancel} onClick={onClose}>
          cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteWarning;
