import { Router } from "express";
import { addRecipe, getRecipes } from "../controllers/recipes";

export const recipes = Router();

recipes.route("/addRecipe").post(addRecipe);
recipes.route("/getAllRecipes").get(getRecipes);
