import * as mongoose from "mongoose";

export interface IRecipe {
  name: string;
  prepTimeHours: number;
  prepTimeMinutes: number;
  cookTimeHours: number;
  cookTimeMinutes: number;
  ingredients: string;
  directions: string;
  cuisine: string;
  user_email: string;
  image: string;
}

const RecipeSchema = new mongoose.Schema<IRecipe>({
  name: String, //{ type: String, required: true },
  prepTimeHours: Number,
  prepTimeMinutes: Number,
  cookTimeHours: Number,
  cookTimeMinutes: Number,
  ingredients: String,
  directions: String,
  cuisine: String,
  user_email: String,
  image: String,
});

export const Recipe = mongoose.model("Recipe", RecipeSchema);
