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

const baseApiURL = "https://api.spoonacular.com/recipes";

export const searchRecipes = async (req: Request, res: Response) => {
  let {
    includeIngredients,
    excludeIngredients,
    cuisines,
    intolerances,
    query,
  } = req.query;

  let results;

  try {
    results = await axiosInstance.get(
      `${baseApiURL}/complexSearch?apiKey=${process.env.API_KEY}&cuisines=${cuisines}&` +
        `inolerances=${intolerances}&includeIngredients=${includeIngredients}&` +
        `excludeIngredients=${excludeIngredients}&query=${query}`
    );
    res.json(results.data);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
