import { ChangeEvent, Ref, RefObject, useRef } from "react";
import styles from "./styles/SearchBar.module.css";

type SearchBarProps = {
  handleSearchTermChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
      <input
        type="text"
        id="search-receipes"
        className={styles.search}
        placeholder={placeholder}
        onChange={handleSearchTermChange}
        ref={searchBarRef}
      />
      <button className={styles.clear} onClick={handleClear}>
        x
      </button>
    </div>
  );
};

export default SearchBar;
