import styles from "./styles/RecipeSearchResultsList.module.css";
import { SearchResult } from "@component/pages/search-recipes";
import RecipeSearchResult from "./RecipeSearchResult";
import { Recipe } from "@component/pages/recipes";

type RecipeSearchResultsListProps = {
  results: SearchResult[];
  savedRecipes: string[];
  onOpenRecipeInfo: (id: number, saved: boolean) => void;
};

const RecipeSearchResultsList = ({
  results,
  savedRecipes,
  onOpenRecipeInfo,
}: RecipeSearchResultsListProps) => {
  const searchResults = results.map((result) => (
    <RecipeSearchResult
      result={result}
      savedRecipes={savedRecipes}
      onOpenRecipeInfo={onOpenRecipeInfo}
      key={result.id}
    />
  ));
  return (
    <>
      <h2 className={styles.heading}>Results</h2>
      <div className={styles.list}>{searchResults}</div>;
    </>
  );
};

export default RecipeSearchResultsList;
