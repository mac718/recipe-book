import { Recipe } from "@component/pages/recipes";
import styles from "./styles/RecipeListCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useState } from "react";
import DeleteWarning from "./DeleteWarning";
import Modal from "./Modal";
import EditDelete from "./EditDelete";

type RecipeListCardProps = {
  recipe: Recipe;
  onOpenEditForm: (rec: string) => void;
  getRecipes: () => void;
};

const RecipeListCard = ({
  recipe,
  onOpenEditForm,
  getRecipes,
}: RecipeListCardProps) => {
  const [openDeleteWarning, setOpenDeleteWarning] = useState(false);

  const handleModalClose = () => {
    setOpenDeleteWarning(false);
  };

  const handleOpenDeletWarning = () => {
    setOpenDeleteWarning(true);
  };
  return (
    <>
      {openDeleteWarning && (
        <Modal onClose={handleModalClose}>
          <DeleteWarning
            id={recipe._id}
            onClose={handleModalClose}
            getRecipes={getRecipes}
          />
        </Modal>
      )}

      <div className={styles.card}>
        <div className={styles.image}>
          <Link href={`/recipe/${recipe._id}`}>
            <Image
              loader={() => recipe.image}
              alt=""
              src={recipe.image}
              fill={true}
              priority={true}
            />
          </Link>
        </div>

        <div className={styles.name}>
          <Link href={`/recipe/${recipe._id}`}>{recipe.name}</Link>
          <EditDelete
            recipe={recipe._id}
            onOpenEditForm={onOpenEditForm}
            onOpenDeleteForm={handleOpenDeletWarning}
          />
          {/* <div className={styles.options}>
            <div className={styles["icon-container"]}>
              <div className={styles.tooltip}>
                <span className={styles.tooltiptext}>Edit Recipe</span>
                <GrEdit onClick={() => onOpenEditForm(recipe._id)} />
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
          </div>*/}
        </div>
      </div>
    </>
  );
};

export default RecipeListCard;
