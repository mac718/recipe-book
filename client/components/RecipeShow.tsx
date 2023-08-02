import styles from "./styles/RecipeShow.module.css";
import Image from "next/image";
import EditDelete from "./EditDelete";

type RecipeShowProps = {
  _id: string | undefined;
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
      }[]
    | undefined;
  directions: string | undefined | [];
  cuisine: string | undefined;
  user_email: string | undefined;
  image: string | undefined;
  onOpenEditForm: (rec: string) => void | undefined;
  onOpenDeleteWarning: () => void | undefined;
};
const RecipeShow = ({
  _id,
  name,
  prepTime,
  cookTime,
  ingredients,
  directions,
  cuisine,
  image,
  onOpenDeleteWarning,
  onOpenEditForm,
}: RecipeShowProps) => {
  let directionListItems: JSX.Element[] = [];
  let ingredientsListItems: JSX.Element[] = [];

  if (directions) {
    let splitDirections: string[] = [];
    if (typeof directions === "object") {
      for (const direction of directions[0]["steps"]) {
        console.log(direction.step.split("."));
        const directionText = direction.step;
        splitDirections = splitDirections.concat(
          directionText.split(".").slice(0, -1)
        );
      }
    } else {
      splitDirections = directions.split("/");
    }
    directionListItems = splitDirections.map((item) => (
      <li key={item}>{item.trim()}</li>
    ));
  }

  if (ingredients) {
    let splitIngredients: string[] = [];
    if (typeof ingredients === "string") {
      splitIngredients = ingredients.split("/");
    } else {
      for (const ingredient of ingredients) {
        splitIngredients.push(ingredient.name);
      }
    }

    ingredientsListItems = splitIngredients!.map((item) => (
      <li key={item}>{item.trim()}</li>
    ));
  }
  if (_id) {
    return (
      <div className={styles.main}>
        <div className={styles.recipe}>
          <div className={styles["recipe-image"]}>
            <Image
              loader={() => image!}
              alt=""
              src={image!}
              fill={true}
              priority={true}
            />
          </div>

          <div className={styles.info}>
            <div className={styles["recipe-name"]}>{name}</div>
            <EditDelete
              recipe={_id}
              onOpenEditForm={onOpenEditForm}
              onOpenDeleteForm={onOpenDeleteWarning}
            />
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
            <ol>{ingredientsListItems}</ol>
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
