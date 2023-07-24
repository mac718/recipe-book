import { FormEvent, useState } from "react";
import styles from "../styles/SearchRecipesPage.module.css";
import axios from "axios";
import CriteriaSelectorList from "@component/components/CriteriaSelectorList";
import { GetServerSideProps } from "next";

const SearchRecipesPage = () => {
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
    const intoleranceArrString = Object.keys(intolerances)
      .filter((key) => intolerances[key])
      .join(",");

    const cuisineArrString = Object.keys(cuisines)
      .filter((key) => cuisines[key])
      .join(",");
    const includeIngredientsString = includeIngredients.join(",");
    const excludeIngredientsString = excludeIngredients.join(",");
    const queryString = query.join(",");
    console.log(
      intoleranceArrString,
      cuisineArrString,
      includeIngredients,
      excludeIngredients,
      query
    );
    let results;
    try {
      results = await axios.get(
        `/spoonacular/search-recipes?cuisines=${cuisineArrString}&intolerances=${intoleranceArrString}&` +
          `includeIngredients=${includeIngredientsString}&` +
          `excludeIngredients=${excludeIngredientsString}&query=${queryString}`
      );
      console.log(results);
    } catch (err) {
      console.log(err);
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

  return (
    <>
      <h1 className={styles.heading}>Recipe Search</h1>
      <form className={styles["search-form"]} onSubmit={onSubmit}>
        <div className={styles.dropdowns}>
          <CriteriaSelectorList
            options={supportedCuisines}
            onSelection={onSelection}
            optionType={"cuisine"}
          />
          <CriteriaSelectorList
            options={supportedIntolerances}
            onSelection={onSelection}
            optionType={"intolerance"}
          />
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
            {includeIngredients}
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
            {excludeIngredients}
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
            {query}
          </div>
        </div>
        <div className={styles["search-button-container"]}>
          <button type="submit" className={styles["search-button"]}>
            Search
          </button>
        </div>
      </form>
      <hr className={styles.hr} />
      <section></section>
    </>
  );
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
    props: {},
  };
};
