import { Router } from "express";
import { addRecipe, getRecipes } from "../controllers/recipes";
import { isLoggedIn } from "../middlewares/isLoggedIn";

export const recipes = Router();

recipes.route("/addRecipe").post(isLoggedIn, addRecipe);
recipes.route("/getAllRecipes").get(isLoggedIn, getRecipes);
