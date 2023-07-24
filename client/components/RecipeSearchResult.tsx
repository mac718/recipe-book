import { SearchResult } from "@component/pages/search-recipes";
import styles from "./styles/RecipeSearchResult.module.css";
import Image from "next/image";

const RecipeSearchResult = ({ result }: { result: SearchResult }) => {
  return (
    <div className={styles["search-result"]}>
      <Image src={result.image} alt="recipe image" width={200} height={200} />
      <div>{result.title}</div>
    </div>
  );
};

export default RecipeSearchResult;
