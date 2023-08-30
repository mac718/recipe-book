import "@component/styles/globals.css";
import type { AppProps } from "next/app";
import axios from "axios";
import { Quicksand } from "next/font/google";
import { ReactElement, ReactNode, useEffect, useState } from "react";
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
  const [getRecipes, setGetRecipes] = useState<() => void>(() => {});

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
  };

  useEffect(() => {
    if (recipeToEditInfo) {
      setShowRecipeForm(true);
    }
  }, [recipeToEditInfo]);

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
              setGetRecipes={setGetRecipes}
              editMode={editMode}
              recipeToEdit={recipeToEdit}
              recipeToEditInfo={recipeToEditInfo}
              setEditMode={setEditMode}
              setRecipeToEdit={setRecipeToEdit}
              setRecipeToEditInfo={setRecipeToEditInfo}
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
          setGetRecipes={setGetRecipes}
          setRecipeToEditInfo={setRecipeToEditInfo}
          setEditMode={setEditMode}
        />
      )}
    </main>
  );
}
