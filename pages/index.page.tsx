import type { NextPage } from "next";
import Head from "next/head";
import { DEFAULT_TITLE } from "~/constants/text";
import Main from "./Main.view";
import useMainProps from "./useMainProps";

const Home: NextPage = () => {
  const props = useMainProps();

  return (
    <>
      <Head>
        <title>{DEFAULT_TITLE}</title>
        <meta name="description" content="손쉽게 짤 링크를 생성하고 공유하세요." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main {...props} />
    </>
  );
};

export default Home;
