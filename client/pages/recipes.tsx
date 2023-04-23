import AddRecipe from "@component/components/AddRecipe";
import Modal from "@component/components/Modal";
import { useState } from "react";
import styles from "../styles/RecipesPage.module.css";

const RecipesPage = () => {
  const [openRecipeForm, setOpenRecipeForm] = useState(false);

  const onClose = () => {
    setOpenRecipeForm(false);
  };

  return (
    <div className={styles.recipes}>
      {openRecipeForm && (
        <Modal onClose={onClose}>
          <AddRecipe />
        </Modal>
      )}
      <h1 className={styles.heading}>Your Recipes</h1>
      <input
        type="text"
        id="search-receipes"
        className={styles.search}
        placeholder="search by name, cuisine, ingredients..."
      />
      <button
        className={styles["add-button"]}
        onClick={() => setOpenRecipeForm(true)}
      >
        Add Recipe
      </button>
      <section className={styles["recipe-grid"]}>
        <div>1</div>
        <div>2</div>
      </section>
    </div>
  );
};

export default RecipesPage;
