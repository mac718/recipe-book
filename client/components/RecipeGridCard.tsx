import styles from "../styles/RecipeGridCard.module.css";
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
      </div>
    </>
  );
};

export default RecipeGridCard;
