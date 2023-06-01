import RecipeShow from "@component/components/RecipeShow";
import { Recipe } from "../recipes";
import { GetServerSideProps } from "next";
import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SearchBar from "@component/components/SearchBar";
type RecipePageProps = {
  //recipes: Recipe[];
  currentRecipe: Recipe;
  currentRecipeId: string;
};
const RecipePage = ({ currentRecipeId }: RecipePageProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe>({
    _id: "",
    name: "",
    prepTime: "",
    cookTime: "",
    ingredients: "",
    directions: "",
    cuisine: "",
    user_email: "",
    image: "",
  });
  const getRecipes = async () => {
    let allRecipes: any;
    try {
      allRecipes = await axios.get(
        "http://localhost:8000/recipes/getAllRecipes",
        {
          withCredentials: true,
        }
      );

      console.log("uhhh", allRecipes);
    } catch (err) {
      console.log(err);
    }
    console.log("allrecipes", currentRecipeId);
    setRecipes(allRecipes.data);
    console.log("things", recipes);
    setCurrentRecipe(
      allRecipes.data.filter((rec: Recipe) => rec._id === currentRecipeId)[0]
    );
    console.log("current", currentRecipe);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(searchBarRef.current);
    let filteredRecipes;
    if (
      searchBarRef &&
      searchBarRef.current &&
      searchBarRef.current.value !== ""
    ) {
      filteredRecipes = recipes?.filter(
        (recipe) =>
          recipe.name
            .toLowerCase()
            .includes(searchBarRef.current!.value.toLowerCase()) ||
          recipe.ingredients
            .toLowerCase()
            .includes(searchBarRef.current!.value.toLowerCase()) ||
          recipe.cuisine
            .toLowerCase()
            .includes(searchBarRef.current!.value.toLowerCase())
      );
    } else {
      filteredRecipes = recipes;
    }
    setRecipes(filteredRecipes);
  };

  const searchBarRef = useRef<HTMLInputElement>(null); //null eliminates type error

  return (
    <div>
      <SearchBar
        handleSearchTermChange={handleSearchTermChange}
        searchBarRef={searchBarRef}
      />
      <RecipeShow {...currentRecipe} />
    </div>
  );
};

export default RecipePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const email = context.req.cookies.user;
  if (!email) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  let currentRecipeId = context.params!.id;
  let allRecipes: any;

  try {
    allRecipes = await axios.get(
      `http://localhost:8000/recipes/getAllRecipes`,
      {
        headers: {
          Cookie: context.req.cookies.user,
        },
      } //${currentRecipeId}
    );
  } catch (err) {
    console.log(err);
  }

  const currentRecipe = allRecipes.data.filter(
    (recipe: Recipe) => recipe._id === currentRecipeId
  )[0];

  return {
    props: {
      currentRecipeId,
    },
  };
};
