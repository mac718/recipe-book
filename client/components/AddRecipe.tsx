import axios, { AxiosResponse } from "axios";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./styles/AddRecipe.module.css";
import { Recipe } from "@component/pages/recipes";
import { useRouter } from "next/router";
import ErrorDiv from "./ErrorDiv";

type AddRecipeProps = {
  onClose: () => void;
  getRecipes: () => void; //(() => Promise<void>) | undefined;
  //setGetRecipes: (getRecipes: (() => Promise<void>) | undefined) => void; // Dispatch<SetStateAction<() => void>>;
  editMode: boolean;
  recipeToEditInfo: Recipe | null | undefined;
  recipeToEdit: string | null;
  //setEditMode: Dispatch<SetStateAction<boolean>>;
  //setRecipeToEdit: (rec: string) => void; //Dispatch<SetStateAction<string | null>>;
  //setRecipeToEditInfo: (rec: Recipe | undefined) => void; //Dispatch<SetStateAction<Recipe | undefined>>;
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
  // setEditMode,
  // setRecipeToEdit,
  // setRecipeToEditInfo,
  // setGetRecipes,
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
      setErrors(res.data.errors!);
    } else {
      onCloseSpinner();
      getRecipes();
      //setGetRecipes(getRecipes);
      onClose();
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editMode) {
      console.log("ingredients", ingredientsRef.current?.value);
      try {
        onShowSpinner();
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

        console.log(err);
        setErrors([err]);
      }
    } else {
      try {
        onShowSpinner();
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

        <div className={styles["cook-time-group"]}>
          <label htmlFor="prep-time">Prep Time</label>
          <div className={styles["hours-minutes"]}>
            <div className={styles["label-input-time"]}>
              <input
                type="number"
                min={0}
                id="prep-time-hours"
                ref={prepTimeHoursRef}
                defaultValue={recipeToEditInfo?.prepTimeHours}
              />
              <label htmlFor="prep-time-hours">hours</label>
            </div>
            <div className={styles["label-input-time"]}>
              <input
                type="number"
                min={0}
                id="prep-time-minutes"
                ref={prepTimeMinutesRef}
                defaultValue={recipeToEditInfo?.prepTimeMinutes}
              />
              <label htmlFor="prep-time-minutes">minutes</label>
            </div>
          </div>
        </div>
        <div className={styles["cook-time-group"]}>
          <label htmlFor="cook-time">Cook Time</label>
          <div className={styles["hours-minutes"]}>
            <div className={styles["label-input-time"]}>
              <input
                type="number"
                min={0}
                id="cook-time-hours"
                ref={cookTimeHoursRef}
                defaultValue={recipeToEditInfo?.cookTimeHours}
              />
              <label htmlFor="cook-time-hours">hours</label>
            </div>
            <div className={styles["label-input-time"]}>
              <input
                type="number"
                min={0}
                id="cook-time-minutes"
                ref={cookTimeMinutesRef}
                defaultValue={recipeToEditInfo?.cookTimeMinutes}
              />
              <label htmlFor="cook-time-minutes">minutes</label>
            </div>
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
