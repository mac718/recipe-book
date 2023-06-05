import AddRecipe from "@component/components/AddRecipe";
import Modal from "@component/components/Modal";
import RecipeGridCard from "@component/components/RecipeGridCard";
import { ChangeEvent, ReactElement, useEffect, useRef, useState } from "react";
import styles from "../styles/RecipesPage.module.css";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import SearchBar from "@component/components/SearchBar";
import Spinner from "@component/components/Spinner";

export type Recipe = {
  _id: string;
  name: string;
  prepTime: string;
  cookTime: string;
  ingredients: string;
  directions: string;
  cuisine: string;
  image: string;
  user_email: string;
};

type RecipesPageProps = {
  user_email: string;
  recipes: Recipe[];
};

const RecipesPage = ({ user_email }: RecipesPageProps) => {
  const [openRecipeForm, setOpenRecipeForm] = useState(false);
  const [allRecipes, setAllRecipes] = useState<Recipe[] | undefined>();
  const [recipes, setRecipes] = useState<Recipe[] | undefined>();
  const [editMode, setEditMode] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState<string | null>(null);
  const [showSpinner, setShowSpinner] = useState(false);

  const router = useRouter();

  const searchBarRef = useRef<HTMLInputElement>(null); //null eliminates type error

  const onClose = () => {
    setOpenRecipeForm(false);
  };

  const onOpenEditForm = (rec: string) => {
    setEditMode(true);
    setRecipeToEdit(rec);
    setOpenRecipeForm(true);
  };

  const onShowSpinner = () => {
    setShowSpinner(true);
  };

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(searchBarRef.current!.value);
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
      filteredRecipes = allRecipes;
    }
    setRecipes(filteredRecipes);
  };

  let recipeCards: ReactElement[] = [];

  const getRecipes = async () => {
    let recipes: any;
    try {
      recipes = await axios.get("http://localhost:8000/recipes/getAllRecipes", {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
    setAllRecipes(recipes ? recipes.data : []);
    setRecipes(recipes ? recipes.data : []);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  recipeCards = recipes
    ? recipes.map((recipe) => {
        return (
          <RecipeGridCard
            recipe={recipe}
            getRecipes={getRecipes}
            onOpenEditForm={onOpenEditForm}
            key={recipe._id}
            onShowSpinner={onShowSpinner}
          />
        );
      })
    : [];

  let recipeToEditInfo = null;
  if (recipeToEdit) {
    recipeToEditInfo = recipes?.filter(
      (recipe) => recipe._id === recipeToEdit
    )[0];
  }

  const handleClearSearchBar = () => {
    setRecipes(allRecipes);
  };

  return (
    <div className={styles.recipes}>
      {showSpinner && <Spinner />}
      {openRecipeForm && (
        <Modal onClose={onClose}>
          <AddRecipe
            onClose={onClose}
            getRecipes={getRecipes}
            editMode={editMode}
            recipeToEdit={recipeToEdit}
            recipeToEditInfo={recipeToEditInfo}
          />
        </Modal>
      )}
      <h1 className={styles.heading}>Your Recipes</h1>
      <div className={styles["search-container"]}>
        <SearchBar
          handleSearchTermChange={handleSearchTermChange}
          searchBarRef={searchBarRef}
          handleClear={handleClearSearchBar}
          placeholder="Find a receipe! Search recipes by name, cuisine, or ingredients..."
        />
      </div>

      <button
        className={styles["add-button"]}
        onClick={(event) => {
          event.preventDefault();
          setEditMode(false);
          setRecipeToEdit(null);
          setOpenRecipeForm(true);
        }}
      >
        Add Recipe
      </button>
      <section className={styles["recipe-grid"]}>{recipeCards}</section>
    </div>
  );
};

export default RecipesPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user_email = context.req.cookies.user;
  if (!user_email) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      user_email,
    },
  };
};
