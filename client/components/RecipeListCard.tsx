import { Recipe } from "@component/pages/recipes";
import styles from "./styles/RecipeListCard.module.css";
import Image from "next/image";
import Link from "next/link";

type RecipeListCardProps = {
  recipe: Recipe;
};

const RecipeListCard = ({ recipe }: RecipeListCardProps) => {
  return (
    <Link href={`/recipe/${recipe._id}`}>
      <div className={styles.card}>
        <div className={styles.image}>
          <Image
            loader={() => recipe.image}
            alt=""
            src={recipe.image}
            fill={true}
          />
        </div>
        <div>{recipe.name}</div>
      </div>
    </Link>
  );
};

export default RecipeListCard;
