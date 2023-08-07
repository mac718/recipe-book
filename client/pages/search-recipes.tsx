import { FormEvent, ReactElement, useState } from "react";
import styles from "../styles/SearchRecipesPage.module.css";
import axios, { AxiosResponse } from "axios";
import CriteriaSelectorList from "@component/components/CriteriaSelectorList";
import { GetServerSideProps } from "next";
import RecipeSearchResultsList from "@component/components/RecipeSearchResultsList";
import Modal from "@component/components/Modal";
import Spinner from "@component/components/Spinner";
import { useRouter } from "next/router";
import { Recipe } from "./recipes";
import RecipeShow from "@component/components/RecipeShow";
import APIRecipeSearchTerm from "@component/components/APIRecipeSearchTerm";
import { NextPageWithLayout } from "./_app";
import Layout from "@component/components/Layout";

export type SearchResult = {
  id: number;
  title: string;
  image: string;
  imageType: string;
};

type SearchRecipesPageProps = {
  user_email: string;
};

const SearchRecipesPage: NextPageWithLayout<SearchRecipesPageProps> = ({
  user_email,
}) => {
  const [intolerances, setIntolerances] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [cuisines, setCuisines] = useState<{ [key: string]: boolean }>({});
  const [includeIngredients, setIncludeIngredients] = useState<string[]>([]);
  const [excludeIngredients, setExcludeIngredients] = useState<string[]>([]);
  const [query, setQuery] = useState<string[]>([]);
  const [currentInclude, setCurrentInclude] = useState("");
  const [currentExclude, setCurrentExclude] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [openRecipeInfo, setOpenRecipeInfo] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState<Recipe>();
  const [showSpinner, setShowSpinner] = useState(false);

  const router = useRouter();

  const onAddIncludeIngredient = (event: FormEvent) => {
    event.preventDefault();
    setIncludeIngredients((prev) => [...prev, `${currentInclude} `]);
    setCurrentInclude("");
  };

  const onAddExcludeIngredient = (event: FormEvent) => {
    event.preventDefault();
    setExcludeIngredients((prev) => [...prev, `${currentExclude} `]);
    setCurrentExclude("");
  };

  const onAddKeyTerm = (event: FormEvent) => {
    event.preventDefault();
    setQuery((prev) => [...prev, `${currentQuery} `]);
    setCurrentQuery("");
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setShowSpinner(true);
    localStorage.clear();
    const intoleranceArrString = Object.keys(intolerances)
      .filter((key) => intolerances[key])
      .join(",");

    const cuisineArrString = Object.keys(cuisines)
      .filter((key) => cuisines[key])
      .join(",");
    const includeIngredientsString = includeIngredients.join(",");
    const excludeIngredientsString = excludeIngredients.join(",");
    const queryString = query.join(",");

    let results;
    try {
      results = await axios.get(
        `/spoonacular/search-recipes?cuisines=${cuisineArrString}&intolerances=${intoleranceArrString}&` +
          `includeIngredients=${includeIngredientsString}&` +
          `excludeIngredients=${excludeIngredientsString}&query=${queryString}&instructionsRequired=${true}`
      );
      setSearchResults(results.data.results);
      setShowSpinner(false);
      router.push("#results");
    } catch (err) {
      console.log(err);
      setShowSpinner(false);
    }
  };

  const onSelection = (option: string, optionType: string) => {
    if (optionType === "cuisine") {
      if (cuisines[option]) {
        setCuisines({ ...cuisines, [option]: false });
      } else {
        setCuisines({ ...cuisines, [option]: true });
      }
    }

    if (optionType === "intolerance") {
      if (intolerances[option]) {
        setIntolerances({ ...intolerances, [option]: false });
      } else {
        setIntolerances({ ...intolerances, [option]: true });
      }
    }
  };

  const onOpenRecipeInfo = async (id: number) => {
    let recipeInfo: AxiosResponse;
    if (localStorage.getItem(`${id}`)) {
      const cachedRecipe = JSON.parse(localStorage.getItem(`${id}`) || "");
      console.log("cached", cachedRecipe);
      const recipeToView: Recipe = {
        _id: cachedRecipe._id,
        name: cachedRecipe.name,
        prepTime: cachedRecipe.prepTime,
        cookTime: cachedRecipe.cookTime,
        cuisine: cachedRecipe.cuisine,
        directions: cachedRecipe.directions,
        ingredients: cachedRecipe.ingredients,
        user_email: cachedRecipe.email,
        image: cachedRecipe.image,
      };
      setRecipeInfo(recipeToView || {});
    } else {
      try {
        recipeInfo = await axios.get(`/spoonacular/get-recipe-info/${id}`);
        const recipeInfoData = recipeInfo.data;
        const recipeToView: Recipe = {
          _id: recipeInfoData.id,
          name: recipeInfoData.title,
          prepTime: recipeInfoData.prepTime,
          cookTime: recipeInfoData.readyInMinutes,
          cuisine: recipeInfoData.cuisines[0],
          directions: recipeInfoData.analyzedInstructions,
          ingredients: recipeInfoData.extendedIngredients,
          user_email: recipeInfoData.email,
          image: recipeInfoData.image,
        };
        setRecipeInfo(recipeToView);
        localStorage.setItem(
          `${recipeToView._id}`,
          JSON.stringify(recipeToView)
        );
        console.log(recipeInfo.data);
      } catch (err) {
        console.log(err);
      }
    }

    setOpenRecipeInfo(true);
  };

  const supportedCuisines = [
    "African",
    "Asian",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ];

  const supportedIntolerances = [
    "Dairy",
    "Egg",
    "Gluten",
    "Grain",
    "Peanut",
    "Seafood",
    "Sesame",
    "Shellfish",
    "Soy",
    "Sulfite",
    "Tree Nut",
    "Wheat",
  ];

  const onDeleteSearchTerm = (term: string, type: string) => {
    let termsCopy;
    let stateFunc;
    if (type === "include") {
      termsCopy = includeIngredients.slice();
      stateFunc = setIncludeIngredients;
    } else if (type === "exclude") {
      termsCopy = excludeIngredients.slice();
      stateFunc = setExcludeIngredients;
    } else {
      termsCopy = query.slice();
      stateFunc = setQuery;
    }

    let spliceIdex = termsCopy.findIndex((el) => el === term);
    termsCopy.splice(spliceIdex, 1);
    stateFunc(termsCopy);
  };

  const includeIngredientsDivs = includeIngredients.map((ingredient) => (
    <APIRecipeSearchTerm
      term={ingredient}
      onDelete={() => onDeleteSearchTerm(ingredient, "include")}
    />
  ));

  const excludeIngredientsDivs = excludeIngredients.map((ingredient) => (
    <APIRecipeSearchTerm
      term={ingredient}
      onDelete={() => onDeleteSearchTerm(ingredient, "exclude")}
    />
  ));

  const queryDivs = query.map((term) => (
    <APIRecipeSearchTerm
      term={term}
      onDelete={() => onDeleteSearchTerm(term, "query")}
    />
  ));

  console.log("recipeInfo", recipeInfo);

  return (
    <>
      {openRecipeInfo && (
        <Modal onClose={() => setOpenRecipeInfo(false)}>
          <div>
            <RecipeShow
              _id={recipeInfo?._id}
              name={recipeInfo?.name}
              cuisine={recipeInfo?.cuisine}
              ingredients={recipeInfo?.ingredients}
              directions={recipeInfo?.directions}
              prepTime={recipeInfo?.prepTime}
              cookTime={recipeInfo?.cookTime}
              image={recipeInfo?.image}
              user_email={undefined}
              onOpenDeleteWarning={() => {}}
              onOpenEditForm={() => {}}
              saved={false}
            />
            <button>save</button>
          </div>
        </Modal>
      )}
      {showSpinner && <Spinner />}
      <h1 className={styles.heading}>Recipe Search</h1>
      <form className={styles["search-form"]} onSubmit={onSubmit}>
        <div className={styles.dropdowns}>
          <div>
            <div>Select Cuisines</div>
            <CriteriaSelectorList
              options={supportedCuisines}
              onSelection={onSelection}
              optionType={"cuisine"}
            />
          </div>
          <div>
            <div>Select Intolerances</div>
            <CriteriaSelectorList
              options={supportedIntolerances}
              onSelection={onSelection}
              optionType={"intolerance"}
            />
          </div>
        </div>
        <div className={styles["input-grouping"]}>
          <label htmlFor="includeIgredients">
            Enter Ingredients to Include
          </label>
          <div className={styles["input-and-button"]}>
            <input
              type="text"
              id="includeIngredients"
              name="includeIgredients"
              onChange={(event) => setCurrentInclude(event.target.value)}
              value={currentInclude}
              className={styles["text-input"]}
            />
            <button
              className={styles["add-button"]}
              onClick={onAddIncludeIngredient}
            >
              add
            </button>
          </div>
          <div className={`${styles["specified-criteria"]} ${styles.include}`}>
            {includeIngredientsDivs}
          </div>
        </div>
        <div className={styles["input-grouping"]}>
          <label htmlFor="excludeIngredients">
            Enter Ingredients to Exclude
          </label>
          <div className={styles["input-and-button"]}>
            <input
              type="text"
              id="excludeIngredients"
              name="excludeIngredients"
              onChange={(event) => setCurrentExclude(event.target.value)}
              value={currentExclude}
              className={styles["text-input"]}
            />
            <button
              className={styles["add-button"]}
              onClick={onAddExcludeIngredient}
            >
              add
            </button>
          </div>
          <div className={`${styles["specified-criteria"]} ${styles.exclude}`}>
            {excludeIngredientsDivs}
          </div>
        </div>
        <div className={styles["input-grouping"]}>
          <label htmlFor="query">Enter Keywords</label>
          <div className={styles["input-and-button"]}>
            <input
              type="text"
              id="query"
              name="query"
              onChange={(event) => setCurrentQuery(event.target.value)}
              value={currentQuery}
              className={styles["text-input"]}
            />
            <button className={styles["add-button"]} onClick={onAddKeyTerm}>
              add
            </button>
          </div>
          <div className={`${styles["specified-criteria"]} ${styles.query}`}>
            {queryDivs}
          </div>
        </div>
        <div className={styles["search-button-container"]}>
          <button type="submit" className={styles["search-button"]}>
            Search
          </button>
        </div>
      </form>
      <hr className={styles.hr} />
      <section id="results">
        <RecipeSearchResultsList
          results={searchResults}
          onOpenRecipeInfo={onOpenRecipeInfo}
        />
      </section>
    </>
  );
};

SearchRecipesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout user={page.props.user_email}>{page}</Layout>;
};

export default SearchRecipesPage;

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
