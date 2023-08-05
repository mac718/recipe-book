import Link from "next/link";
import styles from "./styles/NavBar.module.css";
import { GiNotebook } from "react-icons/gi";

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/recipes">
        <div className={styles.title}>
          Home Cook Recipe Book <GiNotebook />
        </div>
      </Link>
    </nav>
  );
};

export default NavBar;
