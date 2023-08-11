import Link from "next/link";
import styles from "./styles/NavBar.module.css";
import { AiOutlineHome } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";

type NavBarProps = {
  user: string;
};
const NavBar = ({ user }: NavBarProps) => {
  const [mobile, setMobile] = useState(false);
  const [showDropdownContent, setShowDropdownContent] = useState(false);

  useEffect(() => {
    console.log(window.innerWidth);
    if (window.innerWidth < 700) {
      setMobile(true);
    }
  }, []);
  console.log("dd", showDropdownContent, mobile);

  const dropdownContentClasses = showDropdownContent
    ? `${styles["mobile-dropdown-content"]}`
    : `${styles["mobile-dropdown-content"]} ${styles.hide}`;
  return (
    <nav className={styles.nav}>
      <Link href="/recipes">
        <div className={styles.title}>
          <AiOutlineHome />
        </div>
      </Link>
      <div className={styles["nav-links-and-user"]}>
        {!mobile && (
          <div className={styles["nav-links"]}>
            <div className={styles["nav-link"]}>Add Your Own Recipe</div>
            <Link href="/search-recipes" className={styles["nav-link"]}>
              Search Recipes
            </Link>
          </div>
        )}
        {mobile && (
          <>
            <div className={styles["mobile-dropdown"]}>
              <GiHamburgerMenu
                onClick={() => setShowDropdownContent((prev) => !prev)}
              />
              <div className={dropdownContentClasses}>
                <div className={styles["nav-link"]}>Add Your Own Recipe</div>
                <Link href="/search-recipes" className={styles["nav-link"]}>
                  Search Recipes
                </Link>
              </div>
            </div>
          </>
        )}
        <span className={styles.greeting}>Hi, {user}!</span>
      </div>
    </nav>
  );
};

export default NavBar;
