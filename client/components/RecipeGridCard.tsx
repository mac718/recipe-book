import styles from "../styles/RecipeGridCard.module.css";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin2Line } from "react-icons/ri";
import Modal from "./Modal";
import DeleteWarning from "./DeleteWarning";
import { useState } from "react";

type RecipeGridCardProps = {
  name: string;
};

const RecipeGridCard = ({ name }: RecipeGridCardProps) => {
  const [openDeleteWarning, setOpenDeleteWarning] = useState(false);

  const handleModalClose = () => {
    setOpenDeleteWarning(false);
  };

  return (
    <>
      {openDeleteWarning && (
        <Modal onClose={handleModalClose}>
          <DeleteWarning />
        </Modal>
      )}
      <div className={styles.box}>
        <div className={styles.pic}></div>
        <div className={styles.name}>{name}</div>
        <div className={styles.options}>
          <div className={styles["icon-container"]}>
            <div className={styles.tooltip}>
              <span className={styles.tooltiptext}>Edit Recipe</span>
              <GrEdit />
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
