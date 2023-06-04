import styles from "../styles/RecipeGridCard.module.css";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin2Line } from "react-icons/ri";
import Modal from "./Modal";
import DeleteWarning from "./DeleteWarning";
import { useState } from "react";
import Image from "next/image";
import AddRecipe from "./AddRecipe";
import { Recipe } from "@component/pages/recipes";
import Link from "next/link";
import { query } from "express";
import EditDelete from "./EditDelete";

type RecipeGridCardProps = {
  recipe: Recipe;
  onOpenEditForm: (rec: string) => void;
  getRecipes: () => void;
  onClose: () => void;
  onShowSpinner: () => void;
};

const RecipeGridCard = ({
  recipe,
  onOpenEditForm,
  onClose,
  getRecipes,
  onShowSpinner,
}: RecipeGridCardProps) => {
  const [openDeleteWarning, setOpenDeleteWarning] = useState(false);

  const {
    _id,
    name,
    cookTime,
    prepTime,
    cuisine,
    ingredients,
    directions,
    image,
  } = recipe;

  const handleModalClose = () => {
    setOpenDeleteWarning(false);
  };

  const onOpenDeleteWarning = () => {
    setOpenDeleteWarning(true);
  };

  return (
    <>
      {openDeleteWarning && (
        <Modal onClose={handleModalClose}>
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
            <Image
              loader={() => image}
              alt=""
              src={image}
              fill={true}
              priority={true}
            />
          </div>
          <div className={styles.name}>{name}</div>
        </Link>
        <EditDelete
          recipe={_id}
          onOpenEditForm={onOpenEditForm}
          onOpenDeleteForm={onOpenDeleteWarning}
        />
        {/* <div className={styles.options}>
          <div className={styles["icon-container"]}>
            <div className={styles.tooltip}>
              <span className={styles.tooltiptext}>Edit Recipe</span>
              <GrEdit onClick={() => onOpenEditForm(_id)} />
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
        </div> */}
      </div>
    </>
  );
};

export default RecipeGridCard;
