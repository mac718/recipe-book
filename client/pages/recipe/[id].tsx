import RecipeShow from "@component/components/RecipeShow";
import { Recipe } from "../recipes";
import { GetServerSideProps } from "next";
import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SearchBar from "@component/components/SearchBar";
import styles from "../../styles/RecipeViewPage.module.css";
import RecipeListCard from "@component/components/RecipeListCard";
import { useRouter } from "next/router";
import Modal from "@component/components/Modal";
import AddRecipe from "@component/components/AddRecipe";
import DeleteWarning from "@component/components/DeleteWarning";
import { on } from "events";

type RecipePageProps = {
  //recipes: Recipe[];
  currentRecipe: Recipe;
  currentRecipeId: string;
};
const RecipePage = ({ currentRecipeId }: RecipePageProps) => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
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
  const [openRecipeForm, setOpenRecipeForm] = useState(false);
  const [openDeleteWarning, setOpenDeleteWarning] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState<string | null>(null);

  const getRecipes = async () => {
    let allRecipes: any;
    try {
      allRecipes = await axios.get(
        "http://localhost:8000/recipes/getAllRecipes",
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
    console.log("allrecipes", currentRecipeId);
    setAllRecipes(allRecipes.data);
    setFilteredRecipes(allRecipes.data);

    setCurrentRecipe(
      allRecipes.data.filter((rec: Recipe) => rec._id === currentRecipeId)[0]
    );
  };

  useEffect(() => {
    getRecipes();
  }, [currentRecipeId]);

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
    setFilteredRecipes(filteredRecipes);
  };

  const handleClearSearch = () => {
    setFilteredRecipes(allRecipes);
  };
  console.log("filtered", filteredRecipes);
  const searchBarRef = useRef<HTMLInputElement>(null); //null eliminates type error

  const onOpenEditForm = (rec: string) => {
    setEditMode(true);
    setRecipeToEdit(rec);
    setOpenRecipeForm(true);
  };

  const onClose = () => {
    setOpenRecipeForm(false);
  };

  const onOpenDeleteWarning = () => {
    setOpenDeleteWarning(true);
  };

  const onCloseDeleteWarning = () => {
    setOpenDeleteWarning(false);
  };

  const recipeListCards = filteredRecipes.map((recipe) => (
    <RecipeListCard
      recipe={recipe}
      onOpenEditForm={onOpenEditForm}
      getRecipes={getRecipes}
    />
  ));

  let recipeToEditInfo = null;
  if (recipeToEdit) {
    recipeToEditInfo = allRecipes?.filter(
      (recipe) => recipe._id === recipeToEdit
    )[0];
  }

  return (
    <div className={styles.main}>
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

      {openDeleteWarning && (
        <Modal onClose={onCloseDeleteWarning}>
          <DeleteWarning
            id={currentRecipeId}
            onClose={onCloseDeleteWarning}
            getRecipes={getRecipes}
          />
        </Modal>
      )}
      <div className={styles.search}>
        <div className={styles["search-container"]}>
          <h2>Your Recipes</h2>
          <SearchBar
            handleSearchTermChange={handleSearchTermChange}
            searchBarRef={searchBarRef}
            handleClear={handleClearSearch}
            placeholder="Search recipes..."
          />
        </div>
        {recipeListCards}
      </div>
      <div className={styles.recipe}>
        <RecipeShow
          {...currentRecipe}
          onOpenEditForm={onOpenEditForm}
          onOpenDeleteWarning={onOpenDeleteWarning}
        />
      </div>
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
  console.log("refreshed", currentRecipeId);
  //let allRecipes: any;

  // try {
  //   allRecipes = await axios.get(
  //     `http://localhost:8000/recipes/getAllRecipes`,
  //     {
  //       headers: {
  //         Cookie: context.req.cookies.user,
  //       },
  //     } //${currentRecipeId}
  //   );
  // } catch (err) {
  //   console.log(err);
  // }

  // const currentRecipe = allRecipes.data.filter(
  //   (recipe: Recipe) => recipe._id === currentRecipeId
  // )[0];

  return {
    props: {
      currentRecipeId,
    },
  };
};
