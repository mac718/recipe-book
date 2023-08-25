import axios, { AxiosResponse } from "axios";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import styles from "./styles/AddRecipe.module.css";
import Spinner from "./Spinner";
import { Recipe } from "@component/pages/recipes";
import { useRouter } from "next/router";
import ErrorDiv from "./ErrorDiv";

type AddRecipeProps = {
  onClose: () => void;
  getRecipes: () => void;
  editMode: boolean;
  recipeToEditInfo: Recipe | null | undefined;
  recipeToEdit: string | null;
  onShowSpinner: () => void;
  onCloseSpinner: () => void;
};

type ErrorType = {
  message?: string;
  msg?: string;
};

const AddRecipe = ({
  onClose,
  getRecipes,
  editMode,
  recipeToEditInfo,
  recipeToEdit,
  onShowSpinner,
  onCloseSpinner,
}: AddRecipeProps) => {
  const [image, setImage] = useState<any>();
  const [imageName, setImageName] = useState("");
  const [errors, setErrors] = useState<ErrorType[]>([]);

  const nameRef = useRef<HTMLInputElement>(null);
  const cuisineRef = useRef<HTMLInputElement>(null);
  const prepTimeHoursRef = useRef<HTMLInputElement>(null);
  const prepTimeMinutesRef = useRef<HTMLInputElement>(null);
  const cookTimeHoursRef = useRef<HTMLInputElement>(null);
  const cookTimeMinutesRef = useRef<HTMLInputElement>(null);
  const ingredientsRef = useRef<HTMLTextAreaElement>(null);
  const directionsRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  const ingredientsPlaceholder =
    "Enter ingredients separated by '\\'. For example: eggs\\butter\\salt...";
  const directionPlaceholder =
    "Enter directions in order separated by '\\'. For example: preheat oven\\cube chicken\\add celery to dutch oven...";

  const handleAttachImage = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value.split("\\");
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files![0]);

    reader.onload = () => {
      const binary = reader.result?.slice(23);
      console.log(binary);
      setImage(binary);
      setImageName(name[name.length - 1]);
    };
  };

  // for use in handleSubmit
  const _updateState = (res: AxiosResponse) => {
    if (res.data.errors) {
      onCloseSpinner();
      //setShowSpinner(false);
      setErrors(res.data.errors!);
    } else {
      onCloseSpinner();
      //setShowSpinner(false);
      getRecipes();
      onClose();
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editMode) {
      try {
        onShowSpinner();
        //setShowSpinner(true);
        const res = await axios.put(
          "/recipes/editRecipe",
          {
            id: recipeToEdit,
            name: nameRef.current?.value,
            cuisine: cuisineRef.current?.value,
            prepTimeHours: prepTimeHoursRef.current?.value,
            prepTimeMinutes: prepTimeMinutesRef.current?.value,
            cookTimeHours: cookTimeHoursRef.current?.value,
            cookTimeMinutes: cookTimeMinutesRef.current?.value,
            ingredients: ingredientsRef.current?.value,
            directions: directionsRef.current?.value,
            image,
            imageName,
          },
          { withCredentials: true }
        );

        if (res.status === 401) {
          router.push("/");
        }

        _updateState(res);
      } catch (err: any) {
        onCloseSpinner();
        //setShowSpinner(false);

        console.log(err);
        setErrors([err]);
      }
    } else {
      try {
        onShowSpinner();
        //setShowSpinner(true);
        const res = await axios.post(
          "/recipes/addRecipe",
          {
            name: nameRef.current?.value,
            cuisine: cuisineRef.current?.value,
            prepTimeHours: prepTimeHoursRef.current?.value,
            prepTimeMinutes: prepTimeMinutesRef.current?.value,
            cookTimeHours: cookTimeHoursRef.current?.value,
            cookTimeMinutes: cookTimeMinutesRef.current?.value,
            ingredients: ingredientsRef.current?.value,
            directions: directionsRef.current?.value,
            image,
            imageName,
          },
          { withCredentials: true }
        );

        _updateState(res);
      } catch (err: any) {
        onCloseSpinner();
        //setShowSpinner(false);
        setErrors([err]);
        console.log(err);
        if (err.response.status === 401) {
          router.push("/");
        }
      }
    }
  };

  const errorDivs = errors.map((err: ErrorType) => {
    if (err.msg) {
      return <ErrorDiv key={err.msg} msg={err.msg} />;
    } else if (err.message) {
      return <ErrorDiv key={err.message} msg={err.message} />;
    }
  });

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <span className={styles.close} onClick={onClose}>
          X
        </span>
        {editMode ? <h1>Edit Recipe</h1> : <h1>Add A New Recipe</h1>}
        {errors.length ? errorDivs : null}
        <div className={styles["label-input"]}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            ref={nameRef}
            defaultValue={recipeToEditInfo?.name}
          />
        </div>
        <div className={styles["label-input"]}>
          <label htmlFor="cuisine">Cuisine</label>
          <input
            type="text"
            id="cuisine"
            ref={cuisineRef}
            defaultValue={recipeToEditInfo?.cuisine}
          />
        </div>
        <div className={styles["label-input"]}>
          <label htmlFor="prep-time">Prep Time</label>
          <input
            type="text"
            id="prep-time"
            ref={prepTimeRef}
            defaultValue={recipeToEditInfo?.prepTime}
          />
        </div>
        <div className={styles["label-input"]}>
          {/* <label htmlFor="cook-time">Cook Time</label> */}
          {/* <input
            type="text"
            id="cook-time"
            ref={cookTimeRef}
            defaultValue={recipeToEditInfo?.cookTime}
          /> */}
          <div className={styles["cookTime-group"]}>
            <label htmlFor="cook-time">Cook Time</label>
            <input type="number" />
            <input type="number" />
          </div>
        </div>
        <div>
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
            ref={ingredientsRef}
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
            ref={directionsRef}
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
