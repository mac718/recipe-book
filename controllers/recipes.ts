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

  const user_email = req.user?.google.email;
  let image_url = "";

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/",
    timeout: 3000,
    httpAgent: new http.Agent({ keepAlive: true }),
  });

  const uploadImage = async () => {};

  const fetchImage = async () => {};

  if (image) {
    try {
      const res = await axiosInstance.post("images", {
        image,
        filename: imageName,
        objectname: imageName,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    try {
      const res = await axiosInstance.get(
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
    cuisine,
    image: image_url,
  });
  await newRecipe.save();
  res.sendStatus(201);
};

export const getRecipes = async (req: Request, res: Response) => {
  const user = req.user;
  try {
    const recipes = await Recipe.find({ user_email: user!.google.email });
    res.json(recipes);
  } catch (err) {
    res.json(err);
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  const recipeName = req.params.name;
  console.log("snarf", recipeName);

  try {
    await Recipe.deleteOne({ name: recipeName });
    res.sendStatus(200);
  } catch (err) {
    res.json(err);
  }
};
