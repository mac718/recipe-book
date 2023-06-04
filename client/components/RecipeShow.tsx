import { Recipe } from "@component/pages/recipes";
import styles from "./styles/RecipeShow.module.css";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin2Line } from "react-icons/ri";
import EditDelete from "./EditDelete";

type RecipeShowProps = {
  _id: string;
  name: string;
  prepTime: string;
  cookTime: string;
  ingredients: string;
  directions: string;
  cuisine: string;
  user_email: string;
  image: string;
  onOpenEditForm: (rec: string) => void;
  onOpenDeleteWarning: () => void;
};
const RecipeShow = ({
  _id,
  name,
  prepTime,
  cookTime,
  ingredients,
  directions,
  cuisine,
  user_email,
  image,
  onOpenDeleteWarning,
  onOpenEditForm,
}: RecipeShowProps) => {
  let splitDirections;
  let splitIngredients;
  let directionListItems: JSX.Element[] = [];
  let ingredientsListItems: JSX.Element[] = [];
  if (directions) {
    splitDirections = directions.split("/");
    directionListItems = splitDirections.map((item) => (
      <li key={item}>{item.trim()}</li>
    ));
  }

  if (ingredients) {
    splitIngredients = ingredients.split("/");
    ingredientsListItems = splitIngredients.map((item) => (
      <li key={item}>{item.trim()}</li>
    ));
  }
  if (_id) {
    return (
      <div className={styles.main}>
        <div className={styles.recipe}>
          <div className={styles["recipe-image"]}>
            <Image
              loader={() => image}
              alt=""
              src={image}
              fill={true}
              priority={true}
            />
          </div>
          {/* <div className={styles.info}>
            <h1 className={styles["recipe-name"]}>{name}</h1>
            <div className={styles.options}>
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

          <div className={styles.info}>
            <div className={styles["recipe-name"]}>{name}</div>
            <EditDelete
              recipe={_id}
              onOpenEditForm={onOpenEditForm}
              onOpenDeleteForm={onOpenDeleteWarning}
            />
            <div className={styles.stats}>
              <div>
                Cuisine: <span className={styles["info-prop"]}>{cuisine}</span>
              </div>
              <div>
                Prep Time:{" "}
                <span className={styles["info-prop"]}>{prepTime}</span>
              </div>
              <div>
                Cook Time:{" "}
                <span className={styles["info-prop"]}>{cookTime}</span>
              </div>
            </div>
          </div>
          <div className={styles.ingredients}>
            <div className={styles["section-heading"]}>Ingredients</div>
            <ol>{ingredientsListItems}</ol>
          </div>
          <div>
            <div className={styles.directions}>
              <div className={styles["section-heading"]}>Directions</div>
              <ol>{directionListItems}</ol>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className={styles["no-recipe"]}>Recipe no longer exists.</div>;
  }
};

export default RecipeShow;
