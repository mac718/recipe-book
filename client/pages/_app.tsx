import "@component/styles/globals.css";
import type { AppProps } from "next/app";
import axios from "axios";
import { Quicksand } from "next/font/google";

const inter = Quicksand({ subsets: ["latin"] });

axios.defaults.baseURL = "http://localhost:8000";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />;
    </main>
  );
}
