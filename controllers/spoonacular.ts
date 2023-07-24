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

export const searchRecipes = async (req: Request, res: Response) => {
  let {
    includeIngredients,
    excludeIngredients,
    cuisines,
    intolerances,
    query,
  } = req.query;

  // const includeIngredientsStr = JSON.parse(
  //   typeof includeIngredients === "string" ? includeIngredients : "[]"
  // ).join(",");
  // const excludeIngredientsStr = JSON.parse(
  //   typeof excludeIngredients === "string" ? excludeIngredients : "[]"
  // ).join(",");
  // const cuisinesStr = JSON.parse(
  //   typeof cuisines === "string" ? cuisines : "[]"
  // ).join(",");
  // const intolerancesStr = JSON.parse(
  //   typeof intolerances === "string" ? intolerances : "[]"
  // ).join(",");
  // const queryStr = JSON.parse(typeof query === "string" ? query : "[]").join(
  //   ","
  // );

  console.log(
    includeIngredients,
    excludeIngredients,
    intolerances,
    cuisines,
    query
  );

  let results;

  try {
    results = await axiosInstance.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&cuisines=${cuisines}&` +
        `inolerances=${intolerances}&includeIngredients=${includeIngredients}&` +
        `excludeIngredients=${excludeIngredients}&query=${query}`
    );
    res.json(results.data);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
