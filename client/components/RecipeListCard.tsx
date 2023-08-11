import { Recipe } from "@component/pages/recipes";
import styles from "./styles/RecipeListCard.module.css";
import Image from "next/image";
import Link from "next/link";
import EditDelete from "./EditDelete";

type RecipeListCardProps = {
  recipe: Recipe;
  onOpenDeleteWarning: (id: string) => void;
  onOpenEditForm: (rec: string) => void;
};

const RecipeListCard = ({
  recipe,
  onOpenDeleteWarning,
  onOpenEditForm,
}: RecipeListCardProps) => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.image}>
          <div className={styles.overlay}>
            <div className={styles["overlay-name"]}>{recipe.name}</div>
            <div className={styles["overlay-cooktime"]}>{recipe.cookTime}</div>
          </div>
          <Link href={`/recipe/${recipe._id}`}>
            <Image
              loader={() => recipe.image}
              alt=""
              src={recipe.image}
              width={500}
              height={200}
              style={{ objectFit: "cover" }}
              // fill={true}
              priority={true}
            />
          </Link>
        </div>

        <div className={styles.name}>
          <Link href={`/recipe/${recipe._id}`}>{recipe.name}</Link>
          <EditDelete
            recipe={recipe._id}
            onOpenEditForm={onOpenEditForm}
            onOpenDeleteForm={onOpenDeleteWarning}
          />
        </div>
      </div>
    </>
  );
};

export default RecipeListCard;
