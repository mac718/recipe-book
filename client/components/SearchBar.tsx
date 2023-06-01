import { ChangeEvent, Ref, RefObject, useRef } from "react";
import styles from "./styles/SearchBar.module.css";

type SearchBarProps = {
  handleSearchTermChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchBarRef: RefObject<HTMLInputElement>;
  handleClear: () => void;
};

const SearchBar = ({
  handleSearchTermChange,
  searchBarRef,
  handleClear,
}: SearchBarProps) => {
  //const searchBarRef = useRef<HTMLInputElement>(null); //null eliminates type error
  return (
    <div className={styles["search-container"]}>
      <input
        type="text"
        id="search-receipes"
        className={styles.search}
        placeholder="Find a receipe! Search recipes by name, cuisine, or ingredients..."
        onChange={handleSearchTermChange}
        ref={searchBarRef}
      />
      <button
        className={styles.clear}
        // onClick={() => {
        //   if (searchBarRef.current) searchBarRef.current.value = "";
        //   //setRecipes(allRecipes);
        // }}
        onClick={handleClear}
      >
        x
      </button>
    </div>
  );
};

export default SearchBar;
