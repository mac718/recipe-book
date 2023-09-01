import AddRecipe from "@component/components/AddRecipe";
import Modal from "@component/components/Modal";
import RecipeGridCard from "@component/components/RecipeGridCard";
import { ReactElement, useEffect, useRef, useState } from "react";
import styles from "../styles/RecipesPage.module.css";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import SearchBar from "@component/components/SearchBar";
import Layout from "../components/Layout";
import { NextPageWithLayout } from "./_app";
import { FiDatabase } from "react-icons/fi";

export type Recipe = {
  _id: string;
  name: string;
  prepTimeHours: number;
  prepTimeMinutes: number;
  cookTimeHours: number;
  cookTimeMinutes: number;
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
  onShowRecipeForm: () => void;
  onCloseRecipeForm: () => void;
  setGetRecipes: () => void;
  setRecipeToEditInfo: (rec: Recipe | undefined) => void; //React.Dispatch<React.SetStateAction<Recipe | null | undefined>>;
  setEditMode: (val: boolean) => void;
  editMode: boolean;
  setRecipeToEdit: (rec: string | undefined) => void;
  recipeToEdit: string;
  recipes: Recipe[];
  getRecipes: () => void;
};

export const handleSearchTermChange = (
  recipes: Recipe[] | undefined,
  ref: React.RefObject<HTMLInputElement>,
  setFilteredRecipes: React.Dispatch<React.SetStateAction<Recipe[] | undefined>>
) => {
  let filteredRecipes;
  if (ref && ref.current && ref.current.value !== "") {
    filteredRecipes = recipes?.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(ref.current!.value.toLowerCase()) ||
        recipe.ingredients
          .toLowerCase()
          .includes(ref.current!.value.toLowerCase()) ||
        (recipe.cuisine &&
          recipe.cuisine
            .toLowerCase()
            .includes(ref.current!.value.toLowerCase()))
    );
  } else {
    filteredRecipes = recipes;
  }
  setFilteredRecipes(filteredRecipes);
};

// const getRecipes = async (
//   setAllRecipes: Dispatch<SetStateAction<Recipe[]>>,
//   setRecipes: Dispatch<SetStateAction<Recipe[]>>
// ) => {
//   let recipes: any;
//   try {
//     recipes = await axios.get("/recipes/getAllRecipes", {
//       withCredentials: true,
//     });
//   } catch (err) {
//     console.log(err);
//   }
//   setAllRecipes(recipes ? recipes.data : []);
//   setRecipes(recipes ? recipes.data : []);
// };

// const onGetRecipes = () => {
//   getRecipes();
// }

const RecipesPage: NextPageWithLayout<RecipesPageProps> = ({
  user_email,
  onShowSpinner,
  onCloseSpinner,
  onCloseRecipeForm,
  onShowRecipeForm,
  setGetRecipes,
  setRecipeToEditInfo,
  setEditMode,
  editMode,
  setRecipeToEdit,
  recipeToEdit,
  recipes,
  getRecipes,
}) => {
  const [openRecipeForm, setOpenRecipeForm] = useState(false);
  const [allRecipes, setAllRecipes] = useState<Recipe[] | undefined>(recipes);
  const [currentRecipes, setCurrentRecipes] = useState<Recipe[] | undefined>(
    recipes
  );

  //const [editMode, setEditMode] = useState(false);
  //const [recipeToEdit, setRecipeToEdit] = useState<string | null>(null);

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

  const debouncedHandleSearchTermChange = () => {
    setTimeout(
      () => handleSearchTermChange(allRecipes, searchBarRef, setCurrentRecipes),
      500
    );
  };

  let recipeCards: ReactElement[] = [];

  recipeCards = currentRecipes
    ? currentRecipes!.map((recipe) => {
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
    setCurrentRecipes(allRecipes);
    searchBarRef.current!.value = "";
  };

  // ensures recipes prop passed from _app is actually populated with receipes when currentRecipes
  // and allRecipes are set.
  useEffect(() => {
    if (!currentRecipes) {
      setCurrentRecipes(recipes);
      setAllRecipes(recipes);
    }
  }, [recipes]);

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
          handleSearchTermChange={debouncedHandleSearchTermChange}
          searchBarRef={searchBarRef}
          handleClear={handleClearSearchBar}
          placeholder="Find a recipe! Search recipes by name, cuisine, or ingredients..."
        />
      </div>

      <button
        className={styles["add-button"]}
        onClick={(event) => {
          event.preventDefault();
          setEditMode(false);
          setRecipeToEdit(undefined);
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
  return (
    <Layout
      user={page.props.user_email}
      onShowRecipeForm={page.props.onShowRecipeForm}
      setEditMode={page.props.setEditMode}
      setRecipeToEditInfo={page.props.setRecipeToEditInfo}
      getRecipes={page.props.getRecipes}
    >
      {page}
    </Layout>
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
    props: { user_email },
  };
};
