import RecipeShow from "@component/components/RecipeShow";
import { Recipe } from "../recipes";
import { GetServerSideProps } from "next";
import axios from "axios";
type RecipePageProps = {
  recipe: Recipe;
};
const RecipePage = ({ recipe }: RecipePageProps) => {
  return (
    <>
      <RecipeShow {...recipe} />
    </>
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
  let currentRecipe: any;

  try {
    currentRecipe = await axios.get(
      `http://localhost:8000/recipes/${currentRecipeId}`
    );
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      recipe: currentRecipe!.data.recipe,
    },
  };
};
