import { SearchResult } from "@component/pages/search-recipes";
import RecipeSearchResult from "./RecipeSearchResult";

const RecipeSearchResultsList = ({ results }: { results: SearchResult[] }) => {
  const searchResults = results.map((result) => (
    <RecipeSearchResult result={result} key={result.id} />
  ));
  return <div>{searchResults}</div>;
};

export default RecipeSearchResultsList;
