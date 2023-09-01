import Link from "next/link";
import styles from "./styles/NavBar.module.css";
import { AiOutlineHome } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "./Modal";
import AddRecipe from "./AddRecipe";
import { Recipe } from "@component/pages/recipes";

type NavBarProps = {
  user: string;
  getRecipes: () => void;
};
const NavBar = ({ user, getRecipes }: NavBarProps) => {
  const [mobile, setMobile] = useState(false);
  const [showDropdownContent, setShowDropdownContent] = useState(false);
  const [openRecipeForm, setOpenRecipeForm] = useState(false);

  const onCloseRecipeForm = () => {
    setOpenRecipeForm(false);
  };

  useEffect(() => {
    console.log(window.innerWidth);
    if (window.innerWidth < 700) {
      setMobile(true);
    }
  }, []);

  const dropdownContentClasses = showDropdownContent
    ? `${styles["mobile-dropdown-content"]}`
    : `${styles["mobile-dropdown-content"]} ${styles.hide}`;
  return (
    <>
      {openRecipeForm && (
        <Modal onClose={onCloseRecipeForm}>
          <AddRecipe
            onClose={onCloseRecipeForm}
            getRecipes={getRecipes}
            onShowSpinner={() => {}}
            onCloseSpinner={() => {}}
            recipeToEdit={"hi"}
            recipeToEditInfo={null}
            editMode={false}
          />
        </Modal>
      )}
      <nav className={styles.nav}>
        <Link href="/recipes">
          <div className={styles.title}>
            <AiOutlineHome />
          </div>
        </Link>
        <div className={styles["nav-links-and-user"]}>
          {!mobile && (
            <div className={styles["nav-links"]}>
              <div
                className={styles["nav-link"]}
                onClick={() => setOpenRecipeForm(true)}
              >
                Add Your Own Recipe
              </div>
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
                  <div
                    className={styles["nav-link"]}
                    onClick={() => setOpenRecipeForm(true)}
                  >
                    Add Your Own Recipe
                  </div>
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
    </>
  );
};

export default NavBar;
