import { Request, Response } from "express";
import { Recipe } from "../models/recipe";
import axios from "axios";
import http from "http";
import { validationResult } from "express-validator";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 6000,
  httpAgent: new http.Agent({ keepAlive: true }),
  proxy: false,
});

const _uploadImage = async (
  axiosInstance: any,
  image: BinaryData,
  imageName: string
) => {
  try {
    const res = await axiosInstance.post("images", {
      image,
      filename: imageName,
      objectname: imageName,
    });
  } catch (err) {
    console.log(err);
  }

  try {
    const res = await axiosInstance.get(
      `images?filename=${imageName}&objectname=${imageName}`,
      { proxy: false }
    );
    const image_url = res.data.split("?")[0];
    return image_url;
  } catch (err) {
    console.log(err);
    return "";
  }
};

const _delete_image = async (axiosInstance: any, objectname: string) => {
  try {
    await axiosInstance.delete(`images/delete?objectname=${objectname}`);
    return true;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const addRecipe = async (req: Request, res: Response) => {
  const {
    name,
    cookTimeHours,
    cookTimeMinutes,
    prepTimeHours,
    prepTimeMinutes,
    ingredients,
    directions,
    cuisine,
    image,
    imageName,
  } = req.body;

  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.json({ errors: result.array() });
  }

  const user_email = req.user?.google.email;
  let image_url = "";

  if (image && !image.includes("spoonacular")) {
    image_url = await _uploadImage(axiosInstance, image, imageName);
  }

  const newRecipe = new Recipe({
    name,
    cookTimeHours,
    cookTimeMinutes,
    prepTimeHours,
    prepTimeMinutes,
    ingredients,
    directions,
    user_email,
    cuisine,
    image: image_url ? image_url : image,
  });
  try {
    await newRecipe.save();
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getRecipes = async (req: Request, res: Response) => {
  const user = req.user;
  console.log("user", user);
  try {
    const recipes = await Recipe.find({ user_email: user?.google.email });
    res.json(recipes);
  } catch (err) {
    res.json(err);
  }
};

export const getRecipeById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const recipe = await Recipe.findById(id);

  if (!recipe) {
    res.json({ err: "Recipe does not exist" });
  }

  res.json({ recipe });
};

export const getRecipeByName = async (req: Request, res: Response) => {
  const name = req.params.name;

  const recipe = await Recipe.find({ name });

  if (!recipe) {
    res.json({ err: "Recipe does not exist" });
  }

  res.json({ recipe });
};

export const deleteRecipe = async (req: Request, res: Response) => {
  console.log("hello from delete");
  const recipeId = req.params.id;
  const recipe = await Recipe.findById(recipeId);
  const imageNameSplit = recipe!.image ? recipe!.image.split("/") : [];
  const objectName = imageNameSplit.length
    ? imageNameSplit[imageNameSplit.length - 1]
    : "";
  console.log(objectName);
  try {
    await Recipe.deleteOne({ _id: recipeId });
    if (recipe!.image) await _delete_image(axiosInstance, objectName);
    res.sendStatus(200);
  } catch (err) {
    res.json(err);
  }
};

export const editRecipe = async (req: Request, res: Response) => {
  const {
    id,
    name,
    cookTimeHours,
    cookTimeMinutes,
    prepTimeHours,
    prepTimeMinutes,
    ingredients,
    directions,
    cuisine,
    image,
    imageName,
  } = req.body;

  const existingRecipe = await Recipe.findById(id);

  if (!existingRecipe) {
    res.json({ err: "recipe no longer exists" });
  } else {
    let image_url;
    if (image) {
      image_url = await _uploadImage(axiosInstance, image, imageName);
    }
    await existingRecipe?.updateOne({
      name,
      cookTimeHours,
      cookTimeMinutes,
      prepTimeHours,
      prepTimeMinutes,
      ingredients,
      directions,
      cuisine,
      image: image_url,
    });

    res.sendStatus(200);
  }
};
