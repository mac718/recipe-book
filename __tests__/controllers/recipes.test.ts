import { getRecipeById } from "../../controllers/recipes";
import { Request, Response } from "express";
import { Recipe } from "../../models/recipe";

describe("recipes controller", () => {
  describe("getRecipeById", () => {
    it("should return a recipe if found", async () => {
      const req = {
        params: {
          id: "12345",
        },
      };

      const res = {
        json: jest.fn(),
      };

      const foundRecipe = {
        _id: "12345",
        name: "Test Recipe",
        cuisine: "French",
        ingredients: "salt\\pepper",
        directions: "do this\\do that",
        user_email: "user@email.com",
        prepTimeHours: 1,
        prepTimeMinutes: 1,
        cookTimeHours: 1,
        cookTimeMinutes: 1,
        image: "image",
      };

      Recipe.findById = jest.fn().mockResolvedValueOnce(foundRecipe);

      await getRecipeById(
        req as unknown as Request,
        res as unknown as Response
      );

      expect(Recipe.findById).toHaveBeenCalledWith("12345");
      expect(res.json).toHaveBeenCalledWith({ recipe: foundRecipe });
    });
  });
});
