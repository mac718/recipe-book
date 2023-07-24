import { Router } from "express";
import { body } from "express-validator";
import { searchRecipes } from "../controllers/spoonacular";

export const spoonacular = Router({ strict: true });

spoonacular.route("/search-recipes").get(searchRecipes);
