import { ReactNode } from "react";
import NavBar from "./NavBar";

type LayoutProps = {
  children: ReactNode;
  user: string;
};
const Layout = ({ children, user }: LayoutProps) => {
  return (
    <>
      <NavBar user={user} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
