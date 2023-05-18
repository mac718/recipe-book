import { Request, Response } from "express";
import { Recipe } from "../models/recipe";
import { User, IUser } from "../models/user";

export const addRecipe = async (req: Request, res: Response) => {
  const { name, cookTime, prepTime, ingredients, directions } = req.body;
  console.log(name, cookTime, prepTime, ingredients, directions);
  const user_email = req.user?.google.email;
  console.log("what?", req.user);
  const newRecipe = new Recipe({
    name,
    cookTime,
    prepTime,
    ingredients,
    directions,
    user_email,
  });
  await newRecipe.save();
  res.sendStatus(201);
};

export const getRecipes = async (req: Request, res: Response) => {
  const user = req.user;
  console.log("usercon", user?.google.email);
  const recipes = await Recipe.find({ user_email: user!.google.email });
  console.log("back", recipes);
  res.json(recipes);
};
