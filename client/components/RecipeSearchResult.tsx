import { SearchResult } from "@component/pages/search-recipes";
import styles from "./styles/RecipeSearchResult.module.css";
import Image from "next/image";
import { useState } from "react";

type RecipeSearchResultProps = {
  result: SearchResult;
  savedRecipes: string[];
  onOpenRecipeInfo: (id: number, saved: boolean) => void;
};

const RecipeSearchResult = ({
  result,
  savedRecipes,
  onOpenRecipeInfo,
}: RecipeSearchResultProps) => {
  const [saved, setSaved] = useState(savedRecipes.includes(result.title));
  console.log("saved", savedRecipes, result, saved);
  return (
    <div className={styles["search-result"]}>
      <Image src={result.image} alt="recipe image" width={150} height={125} />
      <div
        className={styles["title"]}
        onClick={() => onOpenRecipeInfo(result.id, saved)}
      >
        {result.title}
      </div>
    </div>
  );
};

export default RecipeSearchResult;
