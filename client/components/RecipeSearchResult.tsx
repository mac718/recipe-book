import { SearchResult } from "@component/pages/search-recipes";
import styles from "./styles/RecipeSearchResult.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

type RecipeSearchResultProps = {
  result: SearchResult;
  savedRecipes: string[];
  onOpenRecipeInfo: (
    id: number,
    savedRecipeId: string | null,
    name: string,
    saved: boolean
  ) => void;
};

const RecipeSearchResult = ({
  result,
  savedRecipes,
  onOpenRecipeInfo,
}: RecipeSearchResultProps) => {
  const [saved, setSaved] = useState(savedRecipes.includes(result.title));
  let savedRecipeId: string | null;

  const getSavedRecipeId = async () => {
    try {
      const res = await axios.get(`/recipes/name/${result.title}`);
      const savedRecipeData = res.data;
      savedRecipeId = savedRecipeData.recipe[0]._id;
    } catch (err) {
      console.log(err);
    }
  };

  if (saved) {
    getSavedRecipeId();
  }

  return (
    <div className={styles["search-result"]}>
      <Image src={result.image} alt="recipe image" width={150} height={125} />
      <div
        className={styles["title"]}
        onClick={() =>
          onOpenRecipeInfo(result.id, savedRecipeId, result.title, saved)
        }
      >
        {result.title}
      </div>
    </div>
  );
};

export default RecipeSearchResult;
