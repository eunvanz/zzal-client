import type { NextPage } from "next";
import Head from "next/head";
import { DEFAULT_TITLE } from "~/constants/text";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{DEFAULT_TITLE}</title>
        <meta name="description" content="손쉽게 짤 링크를 생성하고 공유하세요." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>공사중</main>
    </>
  );
};

export default Home;
