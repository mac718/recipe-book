import "@component/styles/globals.css";
import type { AppProps } from "next/app";
import axios from "axios";
import { Quicksand } from "next/font/google";
import {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { NextPage } from "next";
import Portal from "@component/components/HOC/Portal";
import Spinner from "@component/components/Spinner";
import { Recipe } from "./recipes";
import Modal from "@component/components/Modal";
import AddRecipe from "@component/components/AddRecipe";

const quicksand = Quicksand({ subsets: ["latin"] });

axios.defaults.baseURL = "http://localhost:8000";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState<string | null>(null);
  const [recipeToEditInfo, setRecipeToEditInfo] = useState<Recipe>();
  const [recipes, setRecipes] = useState<Recipe[]>();

  const onShowSpinner = () => {
    setShowSpinner(true);
  };
  const onCloseSpinner = () => {
    setShowSpinner(false);
  };

  const onShowRecipeForm = () => {
    setShowRecipeForm(true);
  };

  const onCloseRecipeForm = () => {
    setShowRecipeForm(false);
    setRecipeToEditInfo(undefined);
    setRecipeToEdit(null);
    setEditMode(false);
  };

  const onSetEditMode = (val: boolean) => {
    setEditMode(val);
  };

  const onSetRecipeToEditInfo = (rec: Recipe | undefined) => {
    setRecipeToEditInfo(rec);
  };

  const onSetRecipeToEdit = (rec: string) => {
    setRecipeToEdit(rec);
  };

  // const onSetGetRecipes = (getRecipes: (() => Promise<void>) | undefined) => {
  //   console.log("getrecs", getRecipes);
  //   setGetRecipes(getRecipes);
  // };

  const getRecipes = async () =>
    // setAllRecipes: Dispatch<SetStateAction<Recipe[]>>,
    // setRecipes: Dispatch<SetStateAction<Recipe[]>>

    {
      let recipes: any;
      try {
        recipes = await axios.get("/recipes/getAllRecipes", {
          withCredentials: true,
        });
      } catch (err) {
        console.log(err);
      }
      //setAllRecipes(recipes ? recipes.data : []);
      setRecipes(recipes ? recipes.data : []);
    };

  // const onGetRecipes = () => {
  //   getRecipes();
  // }
  useEffect(() => {
    getRecipes();
  }, []);

  // useEffect(() => {
  //   if (recipeToEditInfo) {
  //     setShowRecipeForm(true);
  //   }
  //   // if (getRecipes !== undefined) {
  //   //   getRecipes();
  //   // }
  // }, [recipeToEditInfo]);

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <main className={quicksand.className}>
      <Portal>{showSpinner && <Spinner />}</Portal>
      <Portal>
        {showRecipeForm && (
          <Modal onClose={onCloseRecipeForm}>
            <AddRecipe
              onClose={onCloseRecipeForm}
              onCloseSpinner={onCloseSpinner}
              onShowSpinner={onShowSpinner}
              getRecipes={getRecipes}
              //setGetRecipes={onSetGetRecipes}
              editMode={editMode}
              recipeToEdit={recipeToEdit}
              recipeToEditInfo={recipeToEditInfo}
              //setEditMode={setEditMode}
              //setRecipeToEdit={onSetRecipeToEdit}
              //setRecipeToEditInfo={onSetRecipeToEditInfo}
            />
          </Modal>
        )}
      </Portal>
      {getLayout(
        <Component
          {...pageProps}
          onShowSpinner={onShowSpinner}
          onCloseSpinner={onCloseSpinner}
          onShowRecipeForm={onShowRecipeForm}
          onCloseRecipeForm={onCloseRecipeForm}
          //setGetRecipes={setGetRecipes}
          setRecipeToEditInfo={setRecipeToEditInfo}
          setEditMode={onSetEditMode}
          editMode={editMode}
          setRecipeToEdit={onSetRecipeToEdit}
          recipeToEdit={recipeToEdit}
          recipes={recipes}
          getRecipes={getRecipes}
        />
      )}
    </main>
  );
}
