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
    <>
      {openRecipeForm && (
        <Modal onClose={onClose}>
          <AddRecipe />
        </Modal>
      )}
      <h1>Your Recipes</h1>
      <input type="text" id="search-receipes" />
      <button onClick={() => setOpenRecipeForm(true)}>Add Recipe</button>
    </>
  );
};

export default RecipesPage;
