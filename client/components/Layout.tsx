import { Dispatch, ReactNode, SetStateAction } from "react";
import NavBar from "./NavBar";
import { Recipe } from "@component/pages/recipes";

type LayoutProps = {
  children: ReactNode;
  user: string;
  // onShowRecipeForm: () => void;
  // setEditMode: (val: boolean) => void;
  // setRecipeToEditInfo: (rec: Recipe | undefined) => void;
  getRecipes: () => void;
};
const Layout = ({ children, user, getRecipes }: LayoutProps) => {
  return (
    <>
      <NavBar user={user} getRecipes={getRecipes} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
