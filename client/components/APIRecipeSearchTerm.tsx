import styles from "./styles/APIRecipeSearchTerm.module.css";
import { TiDelete } from "react-icons/ti";

type APIRecipeSearchTermProps = {
  term: string;
  onDelete: () => void;
};

const APIRecipeSearchTerm = ({ term, onDelete }: APIRecipeSearchTermProps) => {
  return (
    <div className={styles.wrapper}>
      {term}
      <TiDelete className={styles.icon} onClick={onDelete} />
    </div>
  );
};

export default APIRecipeSearchTerm;
