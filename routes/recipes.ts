import { Router } from "express";
import {
  addRecipe,
  deleteRecipe,
  getRecipes,
  editRecipe,
  getRecipeById,
  getRecipeByName,
} from "../controllers/recipes";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { body } from "express-validator";

export const recipes = Router({ strict: true });

recipes
  .route("/addRecipe")
  .post(
    body("name").isLength({ min: 1 }).withMessage("Recipe must have name."),
    isLoggedIn,
    addRecipe
  );
recipes.route("/getAllRecipes").get(getRecipes);
recipes.route("/:id").delete(deleteRecipe);
recipes.route("/editRecipe").put(editRecipe);
recipes.route("/id/:id").get(getRecipeById);
recipes.route("/name/:name").get(getRecipeByName);
