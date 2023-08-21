import styles from "./styles/RecipeShow.module.css";
import Image from "next/image";
import EditDelete from "./EditDelete";
import { FaSave } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { useRouter } from "next/router";
import Link from "next/link";

type RecipeShowProps = {
  _id: string | undefined;
  db_id: string | null | undefined;
  name: string | undefined;
  prepTime: string | undefined;
  cookTime: string | undefined;
  ingredients:
    | string
    | {
        id: number;
        aisle: string;
        image: string;
        consistency: string;
        name: string;
        original: string;
      }[]
    | undefined;
  directions: string | undefined | [];
  cuisine: string | undefined;
  user_email: string | undefined;
  image: string | undefined;
  onOpenEditForm: (rec: string) => void | undefined;
  onOpenDeleteWarning: () => void | undefined;
  saved: boolean;
  search: boolean;
};
const RecipeShow = ({
  _id,
  db_id,
  name,
  prepTime,
  cookTime,
  ingredients,
  directions,
  cuisine,
  image,
  onOpenDeleteWarning,
  onOpenEditForm,
  saved,
  search,
}: RecipeShowProps) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [isSaved, setIsSaved] = useState(saved);
  const router = useRouter();

  let directionListItems: JSX.Element[] = [];
  let ingredientsListItems: JSX.Element[] = [];

  let splitDirections: string[] = [];
  if (directions) {
    if (Array.isArray(directions)) {
      for (const direction of directions[0]["steps"]) {
        const directionText = direction.step;
        splitDirections = splitDirections.concat(
          directionText.split(".").slice(0, -1)
        );
      }
    } else {
      splitDirections = directions.split("\\");
    }
    directionListItems = splitDirections.map((item) => (
      <li className={styles["list-item"]} key={item}>
        {item.trim()}
      </li>
    ));
  }
  let splitIngredients: string[] = [];
  if (ingredients) {
    if (typeof ingredients === "string") {
      splitIngredients = ingredients.split("\\");
    } else {
      for (const ingredient of ingredients) {
        console.log("ingredient", ingredient);
        splitIngredients.push(ingredient.original);
      }
    }

    ingredientsListItems = splitIngredients!.map((item) => (
      <li className={styles["list-item"]} key={item}>
        {item.trim()}
      </li>
    ));
  }
  const handleSaveRecipe = async (event: MouseEvent) => {
    event.preventDefault();
    try {
      setShowSpinner(true);
      const res = await axios.post(
        "/recipes/addRecipe",
        {
          name,
          cuisine,
          prepTime,
          cookTime,
          ingredients: splitIngredients.join("\\"),
          directions: splitDirections.join("\\"),
          image,
        },
        { withCredentials: true }
      );

      if (res.status === 401) {
        router.push("/");
      }
      setShowSpinner(false);
      setIsSaved(true);
    } catch (err: any) {
      setShowSpinner(false);
      console.log(err);
    }
  };

  if (_id) {
    return (
      <div className={styles.main}>
        {showSpinner && <Spinner />}
        <div className={styles.recipe}>
          <div className={styles["recipe-image"]}>
            <Image
              loader={() => image!}
              alt=""
              src={image!}
              style={{ objectFit: "cover" }}
              fill={true}
              priority={true}
            />
          </div>

          <div className={styles.info}>
            <div className={styles["recipe-name"]}>{name}</div>
            {isSaved && search && (
              <Link
                href={`/recipe/${db_id ? db_id : _id}`}
                className={styles["link-to-recipe"]}
              >
                Go to recipe page
              </Link>
            )}

            {isSaved && !search && (
              <EditDelete
                recipe={_id}
                onOpenEditForm={onOpenEditForm}
                onOpenDeleteForm={onOpenDeleteWarning}
              />
            )}

            {!isSaved && (
              <div className={styles["save-div"]}>
                <button
                  className={styles.save}
                  onClick={(e: any) => handleSaveRecipe(e)}
                >
                  <span className={styles["save-icon"]}>
                    <FaSave />
                  </span>
                  save recipe
                </button>
              </div>
            )}

            <div className={styles.stats}>
              <div>
                Cuisine: <span className={styles["info-prop"]}>{cuisine}</span>
              </div>
              <div>
                Prep Time:{" "}
                <span className={styles["info-prop"]}>{prepTime}</span>
              </div>
              <div>
                Cook Time:{" "}
                <span className={styles["info-prop"]}>{cookTime}</span>
              </div>
            </div>
          </div>
          <div className={styles.ingredients}>
            <div className={styles["section-heading"]}>Ingredients</div>
            <ul>{ingredientsListItems}</ul>
          </div>
          <div>
            <div className={styles.directions}>
              <div className={styles["section-heading"]}>Directions</div>
              <ol>{directionListItems}</ol>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className={styles["no-recipe"]}>Recipe no longer exists.</div>;
  }
};

export default RecipeShow;
