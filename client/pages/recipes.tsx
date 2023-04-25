import AddRecipe from "@component/components/AddRecipe";
import Modal from "@component/components/Modal";
import RecipeGridCard from "@component/components/RecipeGridCard";
import { ChangeEvent, useState } from "react";
import styles from "../styles/RecipesPage.module.css";

const RecipesPage = () => {
  const [openRecipeForm, setOpenRecipeForm] = useState(false);
  const [searchTerms, setSearchTerms] = useState("");

  const onClose = () => {
    setOpenRecipeForm(false);
  };

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerms(event.target.value);
  };

  return (
    <div className={styles.recipes}>
      {openRecipeForm && (
        <Modal onClose={onClose}>
          <AddRecipe />
        </Modal>
      )}
      <h1 className={styles.heading}>Your Recipes</h1>
      <div className={styles["search-container"]}>
        <input
          type="text"
          id="search-receipes"
          className={styles.search}
          placeholder="search recipes by name, cuisine, or ingredients..."
          value={searchTerms}
          onChange={handleSearchTermChange}
        />
        <button className={styles.clear} onClick={() => setSearchTerms("")}>
          x
        </button>
      </div>

      <button
        className={styles["add-button"]}
        onClick={() => setOpenRecipeForm(true)}
      >
        Add Recipe
      </button>
      <section className={styles["recipe-grid"]}>
        <RecipeGridCard name="Meatloaf" />
        <RecipeGridCard name="Chicken Parm" />
      </section>
    </div>
  );
};

export default RecipesPage;
