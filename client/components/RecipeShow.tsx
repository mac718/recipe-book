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
  console.log(name);
  return (
    <div>
      <Image loader={() => image} alt="" src={image} fill={true} />
    </div>
  );
};

export default RecipeShow;
