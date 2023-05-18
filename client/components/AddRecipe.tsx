import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "../styles/AddRecipe.module.css";

type AddRecipeProps = {
  onClose: () => void;
  getRecipes: () => void;
};

const AddRecipe = ({ onClose, getRecipes }: AddRecipeProps) => {
  const [name, setName] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");

  const ingredientsPlaceholder =
    "Enter ingredients separated by '/'. For example: eggs/butter/salt...";
  const directionPlaceholder =
    "Enter directions in order separated by '/'. For example: preheat oven/cube chicken/add celery to dutch oven...";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/addRecipe",
        {
          name,
          prepTime,
          cookTime,
          ingredients,
          directions,
        },
        { withCredentials: true }
      );
      getRecipes();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Add A New Recipe</h1>
      <div className={styles["label-input"]}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setName(event.target.value)
          }
        />
      </div>
      <div className={styles["label-input"]}>
        <label htmlFor="prep-time">Prep Time</label>
        <input
          type="text"
          id="prep-time"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setPrepTime(event.target.value)
          }
        />
      </div>
      <div className={styles["label-input"]}>
        <label htmlFor="cook-time">Cook Time</label>
        <input
          type="text"
          id="cook-time"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setCookTime(event.target.value)
          }
        />
      </div>
      <div className={styles["label-textarea"]}>
        <label htmlFor="ingredients">Ingredients</label>
        <textarea
          rows={10}
          cols={30}
          id="ingredients"
          placeholder={ingredientsPlaceholder}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            setIngredients(event.target.value)
          }
        />
      </div>
      <div className={styles["label-textarea"]}>
        <label htmlFor="directions">Directions</label>
        <textarea
          rows={10}
          cols={30}
          id="directions"
          placeholder={directionPlaceholder}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            setDirections(event.target.value)
          }
        />
      </div>
      <button className={styles.save} type="submit">
        Save Recipe
      </button>
    </form>
  );
};

export default AddRecipe;
