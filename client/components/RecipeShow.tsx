import { Recipe } from "@component/pages/recipes";
import styles from "./styles/RecipeShow.module.css";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";

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
  return (
    <div className={styles.main}>
      <div className={styles.search}></div>
      <div className={styles.recipe}>
        <h1 className={styles["recipe-name"]}>{name}</h1>
        <div className={styles["recipe-image"]}>
          <Image loader={() => image} alt="" src={image} fill={true} />
        </div>
        <div className={styles.info}>
          <div>Cuisine: {cuisine}</div>
          <div>Prep Time: {prepTime}</div>
          <div>Cook Time: {cookTime}</div>
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
};

export default RecipeShow;
