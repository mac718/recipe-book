import styles from "../styles/RecipeGridCard.module.css";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin2Line } from "react-icons/ri";

type RecipeGridCardProps = {
  name: string;
};

const RecipeGridCard = ({ name }: RecipeGridCardProps) => {
  return (
    <div className={styles.box}>
      <div className={styles.pic}></div>
      <div className={styles.name}>{name}</div>
      <div className={styles.options}>
        <div className={styles["icon-container"]}>
          <div className={styles.tooltip}>
            <span className={styles.tooltiptext}>Edit Recipe</span>
            <GrEdit />
          </div>
        </div>
        <div className={styles["icon-container"]}>
          <div className={styles.tooltip}>
            <span className={styles.tooltiptext}>Delete Recipe</span>
            <RiDeleteBin2Line />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeGridCard;
