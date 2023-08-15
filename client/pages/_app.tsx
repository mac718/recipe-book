import "@component/styles/globals.css";
import type { AppProps } from "next/app";
import axios from "axios";
import { Quicksand } from "next/font/google";
import { ReactElement, ReactNode, useState } from "react";
import { NextPage } from "next";
import Portal from "@component/components/HOC/Portal";
import Spinner from "@component/components/Spinner";

const quicksand = Quicksand({ subsets: ["latin"] });

axios.defaults.baseURL = "http://localhost:8000";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [showSpinner, setShowSpinner] = useState(false);

  const onShowSpinner = () => {
    setShowSpinner(true);
  };
  const onCloseSpinner = () => {
    setShowSpinner(false);
  };

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <main className={quicksand.className}>
      <Portal>{showSpinner && <Spinner />}</Portal>
      {getLayout(
        <Component
          {...pageProps}
          onShowSpinner={onShowSpinner}
          onCloseSpinner={onCloseSpinner}
        />
      )}
    </main>
  );
}
