import { Router } from "express";
import {
  addRecipe,
  deleteRecipe,
  getRecipes,
  editRecipe,
} from "../controllers/recipes";
import { isLoggedIn } from "../middlewares/isLoggedIn";

export const recipes = Router();

recipes.route("/addRecipe").post(isLoggedIn, addRecipe);
recipes.route("/getAllRecipes").get(isLoggedIn, getRecipes);
recipes.route("/:name").delete(deleteRecipe);
recipes.route("/editRecipe").put(editRecipe);
