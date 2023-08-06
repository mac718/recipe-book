import Link from "next/link";
import styles from "./styles/NavBar.module.css";
import { GiNotebook } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";

type NavBarProps = {
  user: string;
};
const NavBar = ({ user }: NavBarProps) => {
  return (
    <nav className={styles.nav}>
      <Link href="/recipes">
        <div className={styles.title}>
          <AiOutlineHome />
        </div>
      </Link>
      <div className={styles["nav-links-and-user"]}>
        <div className={styles["nav-links"]}>
          <div className={styles["nav-link"]}>Add Your Own Recipe</div>
          <Link href="/search-recipes" className={styles["nav-link"]}>
            Search Recipes
          </Link>
        </div>
        <span>Hi, {user}!</span>
      </div>
    </nav>
  );
};

export default NavBar;
