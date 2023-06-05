import { GrEdit } from "react-icons/gr";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import styles from "./styles/EditDelete.module.css";

type EditDeleteProps = {
  recipe: string;
  onOpenEditForm: (rec: string) => void;
  onOpenDeleteForm: (id: string) => void;
};

const EditDelete = ({
  recipe,
  onOpenEditForm,
  onOpenDeleteForm,
}: EditDeleteProps) => {
  return (
    <div className={styles.options}>
      <div className={styles["icon-container-edit"]}>
        <div className={styles.tooltip}>
          <span className={styles.tooltiptext}>Edit Recipe</span>
          <AiOutlineEdit onClick={() => onOpenEditForm(recipe)} />
        </div>
      </div>
      <div
        className={styles["icon-container-delete"]}
        onClick={() => onOpenDeleteForm(recipe)}
      >
        <div className={styles.tooltip}>
          <span className={styles.tooltiptext}>Delete Recipe</span>
          <RiDeleteBin2Line />
        </div>
      </div>
    </div>
  );
};

export default EditDelete;
