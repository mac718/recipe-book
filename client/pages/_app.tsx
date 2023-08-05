import "@component/styles/globals.css";
import type { AppProps } from "next/app";
import axios from "axios";
import { Quicksand } from "next/font/google";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

const inter = Quicksand({ subsets: ["latin"] });

axios.defaults.baseURL = "http://localhost:8000";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <main className={inter.className}>
      {getLayout(<Component {...pageProps} />)};
    </main>
  );
}
