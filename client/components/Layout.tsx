import { ReactNode } from "react";
import NavBar from "./NavBar";

type LayoutProps = {
  children: ReactNode;
  user: string;
  onShowRecipeForm: () => void;
};
const Layout = ({ children, user, onShowRecipeForm }: LayoutProps) => {
  return (
    <>
      <NavBar user={user} onShowRecipeForm={onShowRecipeForm} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
