import { ChangeEvent, RefObject } from "react";
import styles from "./styles/SearchBar.module.css";
import { FaSearch } from "react-icons/fa";

type SearchBarProps = {
  handleSearchTermChange: () => void;
  searchBarRef: RefObject<HTMLInputElement>;
  handleClear: () => void;
  placeholder: string;
};

const SearchBar = ({
  handleSearchTermChange,
  searchBarRef,
  handleClear,
  placeholder,
}: SearchBarProps) => {
  return (
    <div className={styles["search-container"]}>
      <span className={styles["search-icon"]}>
        <FaSearch />
      </span>
      <input
        type="text"
        id="search-receipes"
        className={styles.search}
        placeholder={placeholder}
        onChange={handleSearchTermChange}
        ref={searchBarRef}
      />

      <button className={styles.clear} onClick={handleClear}>
        <div className={styles.tooltip}>
          <span className={styles.tooltiptext}>Clear</span>x
        </div>
      </button>
    </div>
  );
};

export default SearchBar;
