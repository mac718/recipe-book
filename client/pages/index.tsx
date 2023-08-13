import Head from "next/head";
import styles from "@component/styles/Home.module.css";
import { FcGoogle } from "react-icons/fc";
import { GiNotebook } from "react-icons/gi";
import { useEffect } from "react";

type HomeProps = {
  onCloseSpinner: () => void;
};
export default function Home({ onCloseSpinner }: HomeProps) {
  useEffect(() => {
    onCloseSpinner();
  }, []);
  return (
    <>
      <Head>
        <title>Home Cook Recipe Book</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>
          Home Cook Recipe Book <GiNotebook />
        </h1>
        <div className={styles["register-login"]}>
          <a
            className={styles["google-link"]}
            href="http://localhost:8000/google"
          >
            <div>
              <FcGoogle />
            </div>
            Continue with Google
          </a>
        </div>
      </main>
    </>
  );
}
