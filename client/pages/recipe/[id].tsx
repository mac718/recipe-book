import RecipeShow from "@component/components/RecipeShow";
import { Recipe } from "../recipes";
import { GetServerSideProps } from "next";
import axios from "axios";
import { ChangeEvent, ReactElement, useEffect, useRef, useState } from "react";
import SearchBar from "@component/components/SearchBar";
import styles from "../../styles/RecipeViewPage.module.css";
import RecipeListCard from "@component/components/RecipeListCard";
import Modal from "@component/components/Modal";
import AddRecipe from "@component/components/AddRecipe";
import DeleteWarning from "@component/components/DeleteWarning";
import Spinner from "@component/components/Spinner";
import { NextPageWithLayout } from "../_app";
import Layout from "@component/components/Layout";

type RecipePageProps = {
  currentRecipeId: string;
  user_email: string;
  onShowSpinner: () => void;
  onCloseSpinner: () => void;
};

const RecipePage: NextPageWithLayout<RecipePageProps> = ({
  currentRecipeId,
  user_email,
  onShowSpinner,
  onCloseSpinner,
}: RecipePageProps) => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [currentRecipeIdState, setCurrentRecipeIdState] =
    useState(currentRecipeId);
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
  const [showSpinner, setShowSpinner] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [slide, setSlide] = useState(false);
  const [retract, setRetract] = useState(false);

  useEffect(() => {
    console.log(window.innerWidth);
    if (window.innerWidth < 1000) {
      setMobile(true);
    }
    onCloseSpinner();
  }, []);

  const getRecipes = async () => {
    let allRecipes: any;
    setShowSpinner(true);
    try {
      allRecipes = await axios.get("/recipes/getAllRecipes", {
        withCredentials: true,
      });
      setShowSpinner(false);
    } catch (err) {
      console.log(err);
      setShowSpinner(false);
    }

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
    searchBarRef.current!.value = "";
  };
  const searchBarRef = useRef<HTMLInputElement>(null); //null eliminates type error

  const onOpenEditForm = (rec: string) => {
    setEditMode(true);
    setRecipeToEdit(rec);
    setOpenRecipeForm(true);
  };

  const onClose = () => {
    setOpenRecipeForm(false);
  };

  const onOpenDeleteWarning = (id: string) => {
    setOpenDeleteWarning(true);
    if (currentRecipeId !== currentRecipeIdState) {
      setCurrentRecipeIdState(id);
    }
  };

  const onCloseDeleteWarning = () => {
    setOpenDeleteWarning(false);
  };

  const onOpenAddRecipeForm = () => {
    setOpenRecipeForm(true);
    setEditMode(false);
    setRecipeToEdit(null);
  };

  let leftClasses = `${styles.left}`;
  const onTabClick = () => {
    setSlide(true);
    setRetract(false);
  };

  if (slide) {
    leftClasses += ` ${styles["search-slide"]}`;
  } else if (retract) {
    leftClasses = `${styles["search-retract"]}`;
  }

  const recipeListCards = filteredRecipes.map((recipe) => (
    <RecipeListCard
      recipe={recipe}
      onOpenDeleteWarning={onOpenDeleteWarning}
      onOpenEditForm={onOpenEditForm}
      key={recipe._id}
    />
  ));

  let recipeToEditInfo = null;
  if (recipeToEdit) {
    recipeToEditInfo = allRecipes?.filter(
      (recipe) => recipe._id === recipeToEdit
    )[0];
  }

  return (
    <div
      className={styles.main}
      onClick={() => {
        if (slide) {
          setSlide(false);
          setRetract(true);
        }
      }}
    >
      {showSpinner && <Spinner />}
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

      {openDeleteWarning && (
        <Modal onClose={onCloseDeleteWarning}>
          <DeleteWarning
            id={currentRecipeIdState}
            onClose={onCloseDeleteWarning}
            getRecipes={getRecipes}
          />
        </Modal>
      )}
      <div className={leftClasses}>
        <div className={styles.search}>
          <div className={styles["search-container"]}>
            <h2>Your Recipes</h2>
            <SearchBar
              handleSearchTermChange={handleSearchTermChange}
              searchBarRef={searchBarRef}
              handleClear={handleClearSearch}
              placeholder="Search recipes..."
            />
            <button
              className={styles["add-recipe-button"]}
              onClick={onOpenAddRecipeForm}
            >
              Add Recipe
            </button>
          </div>
          {recipeListCards}
        </div>
      </div>
      {mobile && (
        <div className={styles.tab} onClick={onTabClick}>
          <div className={styles["tab-text"]}>Search Recipes</div>
        </div>
      )}
      <div className={styles.recipe}>
        <RecipeShow
          {...currentRecipe}
          onOpenEditForm={onOpenEditForm}
          onOpenDeleteWarning={() => onOpenDeleteWarning(currentRecipeId)}
          saved={true}
        />
      </div>
    </div>
  );
};

RecipePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout user={page.props.user_email}>{page}</Layout>;
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

  return {
    props: {
      currentRecipeId,
      user_email: email,
    },
  };
};
