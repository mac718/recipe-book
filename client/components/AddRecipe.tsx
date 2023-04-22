import styles from "../styles/AddRecipe.module.css";

const AddRecipe = () => {
  return (
    <form>
      <h1>Add A New Recipe</h1>
      <label htmlFor="name">Name: </label>
      <input type="text" id="name" />
    </form>
  );
};

export default AddRecipe;
