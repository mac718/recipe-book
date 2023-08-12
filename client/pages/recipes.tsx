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
import Layout from "../components/Layout";
import { NextPageWithLayout } from "./_app";
import { FiDatabase } from "react-icons/fi";

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
  onShowSpinner: () => void;
  onCloseSpinner: () => void;
};

const RecipesPage: NextPageWithLayout<RecipesPageProps> = ({
  user_email,
  onShowSpinner,
  onCloseSpinner,
}) => {
  const [openRecipeForm, setOpenRecipeForm] = useState(false);
  const [allRecipes, setAllRecipes] = useState<Recipe[] | undefined>();
  const [recipes, setRecipes] = useState<Recipe[] | undefined>();
  const [editMode, setEditMode] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState<string | null>(null);

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

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    let filteredRecipes;
    if (
      searchBarRef &&
      searchBarRef.current &&
      searchBarRef.current.value !== ""
    ) {
      filteredRecipes = allRecipes?.filter(
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
      recipes = await axios.get("/recipes/getAllRecipes", {
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
    searchBarRef.current!.value = "";
  };

  return (
    <div className={styles.recipes}>
      {openRecipeForm && (
        <Modal onClose={onClose}>
          <AddRecipe
            onClose={onClose}
            getRecipes={getRecipes}
            editMode={editMode}
            recipeToEdit={recipeToEdit}
            recipeToEditInfo={recipeToEditInfo}
            onShowSpinner={onShowSpinner}
            onCloseSpinner={onCloseSpinner}
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
        <span className={styles.plus}>+</span> Add Your Own Recipe
      </button>

      <div className={styles.or}>
        <span>or</span>
      </div>
      <div className={styles["link-container"]}>
        <a href="/search-recipes" className={styles["search-for-new"]}>
          <span className={styles.database}>
            <FiDatabase />
          </span>
          Search For New Recipes
        </a>
      </div>

      <section className={styles["recipe-grid"]}>{recipeCards}</section>
    </div>
  );
};

RecipesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout user={page.props.user_email}>{page}</Layout>;
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
    props: { user_email },
  };
};
