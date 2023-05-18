import * as mongoose from "mongoose";

export interface IRecipe {
  name: string;
  prepTime: string;
  cookTime: string;
  ingredients: string;
  directions: string;
  user_email: string;
}

const RecipeSchema = new mongoose.Schema<IRecipe>({
  name: String,
  prepTime: String,
  cookTime: String,
  ingredients: String,
  directions: String,
  user_email: String,
});

export const Recipe = mongoose.model("Recipe", RecipeSchema);
