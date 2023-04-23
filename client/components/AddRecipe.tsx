import styles from "../styles/AddRecipe.module.css";

const AddRecipe = () => {
  return (
    <form className={styles.form}>
      <h1>Add A New Recipe</h1>
      <div className={styles["label-input"]}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
      </div>
      <div className={styles["label-input"]}>
        <label htmlFor="prep-time">Prep Time</label>
        <input type="text" id="prep-time" />
      </div>
      <div className={styles["label-input"]}>
        <label htmlFor="cook-time">Cook Time</label>
        <input type="text" id="cook-time" />
      </div>
      <div className={styles["label-textarea"]}>
        <label htmlFor="ingredients">Ingredients</label>
        <textarea rows={10} cols={30} id="ingredients" />
      </div>
      <div className={styles["label-textarea"]}>
        <label htmlFor="directions">Directions</label>
        <textarea rows={10} cols={30} id="directions" />
      </div>
      <button className={styles.save}>Save Recipe</button>
    </form>
  );
};

export default AddRecipe;
