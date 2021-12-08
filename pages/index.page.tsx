import type { NextPage } from "next";
import Head from "next/head";
import {
  DEFAULT_TITLE,
  LOGO_IMAGE_HEIGHT,
  LOGO_IMAGE_TYPE,
  LOGO_IMAGE_URL,
  LOGO_IMAGE_WIDTH,
} from "~/constants/text";
import Main from "./Main.view";
import useMainProps from "./useMainProps";

const Home: NextPage = () => {
  const props = useMainProps();

  return (
    <>
      <Head>
        <title>{DEFAULT_TITLE}</title>
        <meta name="description" content="손쉽게 짤 링크를 생성하고 공유하세요." />
        <meta property="og:image" content={LOGO_IMAGE_URL} />
        <meta property="og:image:url" content={LOGO_IMAGE_URL} />
        <meta property="og:image:secure_url" content={LOGO_IMAGE_URL} />
        <meta property="og:image:type" content={LOGO_IMAGE_TYPE} />
        <meta property="og:image:width" content={LOGO_IMAGE_WIDTH} />
        <meta property="og:image:height" content={LOGO_IMAGE_HEIGHT} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main {...props} />
    </>
  );
};

export default Home;
