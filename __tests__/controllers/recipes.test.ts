import { getRecipeById, addRecipe } from "../../controllers/recipes";
import { Request, Response } from "express";
import { Recipe } from "../../models/recipe";
import request from "supertest";
import { app } from "../../app";
import { NextFunction } from "express-serve-static-core";

jest.mock("../../middlewares/isLoggedIn.ts", () => ({
  isLoggedIn: (req: Request, res: Response, next: NextFunction) => {
    next();
  },
}));

describe("recipes controller", () => {
  describe("addRecipe", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetModules();
    });

    it("should return 201 status if recipe is added successfully", async () => {
      const req = {
        body: {
          name: "Test Recipe",
          cookTimeHours: 1,
          cookTimeMinutes: 30,
          prepTimeHours: 0,
          prepTimeMinutes: 45,
          ingredients: "ingredient1\\ingredient2",
          directions: "Some directions",
          cuisine: "Italian",
          image: "",
          imageName: "image.jpg",
        },
        user: {
          google: {
            email: "test@example.com",
          },
        },
      };

      const res = {
        sendStatus: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Recipe.prototype.save = jest.fn().mockImplementationOnce(() => {});

      await addRecipe(req as Request, res as unknown as Response);

      expect(Recipe.prototype.save).toHaveBeenCalled();
      expect(res.sendStatus).toHaveBeenCalledWith(201);
    });

    it("should return errors if validation fails", (done) => {
      const res = {
        json: jest.fn(),
      };

      request(app)
        .post("/recipes/addRecipe")
        .send({
          name: "",
          cookTimeHours: -1,
          cookTimeMinutes: 0,
          prepTimeHours: 0,
          prepTimeMinutes: 0,
          ingredients: "ingredient1\\ingredient2",
          directions: "Some directions",
          cuisine: "Italian",
          image: "",
          imageName: "",
        })
        .expect(400, done);
    });

    // test("should return 500 status if an error occurs during recipe save", async () => {
    //   const req = {
    //     body: {
    //       name: "Test Recipe",
    //       cookTimeHours: 1,
    //       cookTimeMinutes: 30,
    //       prepTimeHours: 0,
    //       prepTimeMinutes: 45,
    //       ingredients: ["Ingredient 1", "Ingredient 2"],
    //       directions: "Some directions",
    //       cuisine: "Italian",
    //       image: "http://example.com/image.jpg",
    //       imageName: "image.jpg",
    //     },
    //     user: {
    //       google: {
    //         email: "test@example.com",
    //       },
    //     },
    //   };

    //   const res = {
    //     status: jest.fn().mockReturnThis(),
    //     json: jest.fn(),
    //   };

    //   Recipe.prototype.save = jest.fn().mockImplementationOnce(() => {
    //     throw new Error("Database error");
    //   });

    //   await addRecipe(req as Request, res as unknown as Response);

    //   expect(Recipe.prototype.save).toHaveBeenCalled();
    //   expect(res.status).toHaveBeenCalledWith(500);
    //   expect(res.json).toHaveBeenCalledWith("Database error");
    // });
  });

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
        image: "",
      };

      Recipe.findById = jest.fn().mockResolvedValueOnce(foundRecipe);

      await getRecipeById(
        req as unknown as Request,
        res as unknown as Response
      );

      expect(Recipe.findById).toHaveBeenCalledWith("12345");
      expect(res.json).toHaveBeenCalledWith({ recipe: foundRecipe });
    });

    it("should return error message if recipe is not found", async () => {
      const req = {
        params: {
          id: "12345",
        },
      };

      const res = {
        json: jest.fn(),
      };

      Recipe.findById = jest.fn().mockResolvedValueOnce(null);

      await getRecipeById(
        req as unknown as Request,
        res as unknown as Response
      );

      expect(Recipe.findById).toHaveBeenCalledWith("12345");
      expect(res.json).toHaveBeenCalledWith({ err: "Recipe does not exist" });
    });
  });
});
