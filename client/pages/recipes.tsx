import AddRecipe from "@component/components/AddRecipe";
import Modal from "@component/components/Modal";
import RecipeGridCard from "@component/components/RecipeGridCard";
import { ChangeEvent, ReactElement, useEffect, useRef, useState } from "react";
import styles from "../styles/RecipesPage.module.css";
import axios from "axios";
import { GetServerSideProps } from "next";

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
};

const RecipesPage = ({ user_email }: RecipesPageProps) => {
  const [openRecipeForm, setOpenRecipeForm] = useState(false);
  const [searchTerms, setSearchTerms] = useState("");
  const [allRecipes, setAllRecipes] = useState<Recipe[] | undefined>();
  const [recipes, setRecipes] = useState<Recipe[] | undefined>();
  const [editMode, setEditMode] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState<string | null>(null);

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
        const recipeInfo = {
          id: recipe._id,
          name: recipe.name,
          prepTime: recipe.prepTime,
          cookTime: recipe.cookTime,
          directions: recipe.directions,
          ingredients: recipe.ingredients,
          imageUrl: recipe.image,
          user: user_email,
        };

        return (
          <RecipeGridCard
            // recipeInfo={{ name: recipe.name }}
            // name={recipe.name}
            // imageUrl={recipe.image}
            {...recipeInfo}
            getRecipes={getRecipes}
            onOpenEditForm={onOpenEditForm}
            onClose={onClose}
            key={recipe._id}
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
          />
        </Modal>
      )}
      <h1 className={styles.heading}>Your Recipes</h1>
      <div className={styles["search-container"]}>
        <input
          type="text"
          id="search-receipes"
          className={styles.search}
          placeholder="Find a receipe! Search recipes by name, cuisine, or ingredients..."
          //value={searchTerms}
          onChange={handleSearchTermChange}
          ref={searchBarRef}
        />
        <button
          className={styles.clear}
          onClick={() => {
            if (searchBarRef.current) searchBarRef.current.value = "";
            setRecipes(allRecipes);
          }}
        >
          x
        </button>
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
