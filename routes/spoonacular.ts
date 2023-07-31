import { Router } from "express";
import { body } from "express-validator";
import { getRecipeInfo, searchRecipes } from "../controllers/spoonacular";

export const spoonacular = Router({ strict: true });

spoonacular.route("/search-recipes").get(searchRecipes);
spoonacular.route("/get-recipe-info/:id").get(getRecipeInfo);
