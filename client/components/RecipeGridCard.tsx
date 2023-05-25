import styles from "../styles/RecipeGridCard.module.css";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin2Line } from "react-icons/ri";
import Modal from "./Modal";
import DeleteWarning from "./DeleteWarning";
import { useState } from "react";
import Image from "next/image";
import AddRecipe from "./AddRecipe";

type RecipeGridCardProps = {
  name: string;
  imageUrl: string;
  onOpenEditForm: () => void;
  getRecipes: () => void;
  onClose: () => void;
};

const RecipeGridCard = ({
  name,
  imageUrl,
  onOpenEditForm,
  onClose,
  getRecipes,
}: RecipeGridCardProps) => {
  const [openDeleteWarning, setOpenDeleteWarning] = useState(false);

  const handleModalClose = () => {
    setOpenDeleteWarning(false);
  };

  return (
    <>
      {openDeleteWarning && (
        <Modal onClose={handleModalClose}>
          <DeleteWarning
            name={name}
            onClose={onClose}
            getRecipes={getRecipes}
          />
        </Modal>
      )}

      <div className={styles.box}>
        <div className={styles.pic}>
          <Image loader={() => imageUrl} alt="" src={imageUrl} fill={true} />
        </div>
        <div className={styles.name}>{name}</div>
        <div className={styles.options}>
          <div className={styles["icon-container"]}>
            <div className={styles.tooltip}>
              <span className={styles.tooltiptext}>Edit Recipe</span>
              <GrEdit onClick={onOpenEditForm} />
            </div>
          </div>
          <div
            className={styles["icon-container"]}
            onClick={() => setOpenDeleteWarning(true)}
          >
            <div className={styles.tooltip}>
              <span className={styles.tooltiptext}>Delete Recipe</span>
              <RiDeleteBin2Line />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeGridCard;
