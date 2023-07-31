import styles from "./styles/RecipeSearchResultsList.module.css";
import { SearchResult } from "@component/pages/search-recipes";
import RecipeSearchResult from "./RecipeSearchResult";

type RecipeSearchResultsListProps = {
  results: SearchResult[];
  onOpenRecipeInfo: (id: number) => void;
};

const RecipeSearchResultsList = ({
  results,
  onOpenRecipeInfo,
}: RecipeSearchResultsListProps) => {
  const searchResults = results.map((result) => (
    <RecipeSearchResult
      result={result}
      onOpenRecipeInfo={() => onOpenRecipeInfo(result.id)}
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
