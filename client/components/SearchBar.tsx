import { useRef } from "react";

const SearchBar = ({ handleSearchTermChange, setRecipes }) => {
  const searchBarRef = useRef<HTMLInputElement>(null); //null eliminates type error
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
        onClick={() => {
          if (searchBarRef.current) searchBarRef.current.value = "";
          setRecipes(allRecipes);
        }}
      >
        x
      </button>
    </div>
  );
};

export default SearchBar;
