import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "../styles/AddRecipe.module.css";
import Spinner from "./Spinner";
import { Recipe } from "@component/pages/recipes";

type AddRecipeProps = {
  onClose: () => void;
  getRecipes: () => void;
  editMode: boolean;
  recipeToEditInfo: Recipe | null | undefined;
  recipeToEdit: string | null;
};

const AddRecipe = ({
  onClose,
  getRecipes,
  editMode,
  recipeToEditInfo,
  recipeToEdit,
}: AddRecipeProps) => {
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [image, setImage] = useState<any>();
  const [imageName, setImageName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  const ingredientsPlaceholder =
    "Enter ingredients separated by '/'. For example: eggs/butter/salt...";
  const directionPlaceholder =
    "Enter directions in order separated by '/'. For example: preheat oven/cube chicken/add celery to dutch oven...";

  const handleAttachImage = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value.split("\\");
    console.log(name);
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files![0]);

    reader.onload = () => {
      const binary = reader.result?.slice(23);
      console.log(binary);
      setImage(binary);
      setImageName(name[name.length - 1]);
    };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("recipeToEdit", recipeToEdit);
    if (editMode) {
      try {
        setShowSpinner(true);
        await axios.put(
          "http://localhost:8000/editRecipe",
          {
            id: recipeToEdit,
            name,
            cuisine,
            prepTime,
            cookTime,
            ingredients,
            directions,
            image,
          },
          { withCredentials: true }
        );
        setShowSpinner(false);
        getRecipes();
        onClose();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        setShowSpinner(true);
        await axios.post(
          "http://localhost:8000/addRecipe",
          {
            name,
            cuisine,
            prepTime,
            cookTime,
            ingredients,
            directions,
            image,
            imageName,
          },
          { withCredentials: true }
        );
        setShowSpinner(false);
        getRecipes();
        onClose();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      {showSpinner && <Spinner />}
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
            defaultValue={recipeToEditInfo?.name}
          />
        </div>
        <div className={styles["label-input"]}>
          <label htmlFor="cuisine">Cuisine</label>
          <input
            type="text"
            id="cuisine"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setCuisine(event.target.value)
            }
            defaultValue={recipeToEditInfo?.cuisine}
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
            defaultValue={recipeToEditInfo?.prepTime}
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
            defaultValue={recipeToEditInfo?.cookTime}
          />
        </div>
        <div className={styles["image"]}>
          <label htmlFor="image">Picture</label>
          <input
            type="file"
            id="image"
            accept="image/jpg, image/jpeg, image/png"
            onChange={handleAttachImage}
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
            defaultValue={recipeToEditInfo?.ingredients}
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
            defaultValue={recipeToEditInfo?.directions}
          />
        </div>

        <button className={styles.save} type="submit">
          Save Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
