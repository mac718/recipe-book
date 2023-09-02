import styles from "./styles/RecipeGridCard.module.css";
import Modal from "./Modal";
import DeleteWarning from "./DeleteWarning";
import { useState } from "react";
import Image from "next/image";
import { Recipe } from "@component/pages/recipes";
import Link from "next/link";
import EditDelete from "./EditDelete";

type RecipeGridCardProps = {
  recipe: Recipe;
  onOpenEditForm: (rec: string) => void;
  getRecipes: () => void;
  onShowSpinner: () => void;
};

const RecipeGridCard = ({
  recipe,
  onOpenEditForm,
  getRecipes,
  onShowSpinner,
}: RecipeGridCardProps) => {
  const [openDeleteWarning, setOpenDeleteWarning] = useState(false);

  let { _id, name, cookTimeHours, cookTimeMinutes, image } = recipe;

  cookTimeHours = cookTimeHours ? cookTimeHours : 0;
  cookTimeMinutes = cookTimeMinutes ? cookTimeMinutes : 0;

  const handleModalClose = () => {
    setOpenDeleteWarning(false);
  };

  const onOpenDeleteWarning = () => {
    setOpenDeleteWarning(true);
  };

  return (
    <>
      {openDeleteWarning && (
        <Modal onClose={handleModalClose} deleteWarn={true}>
          <DeleteWarning
            id={_id}
            onClose={handleModalClose}
            getRecipes={getRecipes}
          />
        </Modal>
      )}

      <div className={styles.box}>
        <Link href={`/recipe/${recipe._id}`}>
          <div className={styles.pic} onClick={onShowSpinner}>
            <div className={styles.overlay}>
              <div className={styles["overlay-name"]}>{name}</div>
              <div className={styles["overlay-cooktime"]}>
                {cookTimeHours} hours {cookTimeMinutes} minutes
              </div>
            </div>
            <Image
              loader={() => image}
              alt=""
              src={image}
              fill={true}
              priority={true}
            />
          </div>
        </Link>
        <EditDelete
          recipe={_id}
          onOpenEditForm={onOpenEditForm}
          onOpenDeleteForm={onOpenDeleteWarning}
        />
      </div>
    </>
  );
};

export default RecipeGridCard;
