import { Request, Response } from "express";
import { Recipe } from "../models/recipe";
import { User, IUser } from "../models/user";
import axios from "axios";
import http from "http";

export const addRecipe = async (req: Request, res: Response) => {
  const {
    name,
    cookTime,
    prepTime,
    ingredients,
    directions,
    cuisine,
    image,
    imageName,
  } = req.body;
  console.log(name, cookTime, prepTime, ingredients, directions);
  const user_email = req.user?.google.email;
  let image_url = "";

  if (image) {
    const instance = axios.create({
      baseURL: "http://localhost:8080/",
      timeout: 3000,
      httpAgent: new http.Agent({ keepAlive: true }),
    });
    try {
      const res = await instance.post("images", {
        image,
        filename: imageName,
        objectname: imageName,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    try {
      const res = await instance.get(
        `images?filename=${imageName}&objectname=${imageName}`,
        { proxy: false }
      );
      image_url = res.data.split("?")[0];
      console.log(image_url);
    } catch (err) {
      console.log(err);
    }
  }

  const newRecipe = new Recipe({
    name,
    cookTime,
    prepTime,
    ingredients,
    directions,
    user_email,
    image: image_url,
  });
  await newRecipe.save();
  res.sendStatus(201);
};

export const getRecipes = async (req: Request, res: Response) => {
  const user = req.user;
  console.log("usercon", user?.google.email);
  const recipes = await Recipe.find({ user_email: user!.google.email });
  // console.log("back", recipes);
  res.json(recipes);
};
