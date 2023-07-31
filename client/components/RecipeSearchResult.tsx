import { SearchResult } from "@component/pages/search-recipes";
import styles from "./styles/RecipeSearchResult.module.css";
import Image from "next/image";

type RecipeSearchResultProps = {
  result: SearchResult;
  onOpenRecipeInfo: (id: number) => void;
};

const RecipeSearchResult = ({
  result,
  onOpenRecipeInfo,
}: RecipeSearchResultProps) => {
  return (
    <div className={styles["search-result"]}>
      <Image src={result.image} alt="recipe image" width={150} height={125} />
      <div
        className={styles["title"]}
        onClick={() => onOpenRecipeInfo(result.id)}
      >
        {result.title}
      </div>
    </div>
  );
};

export default RecipeSearchResult;
