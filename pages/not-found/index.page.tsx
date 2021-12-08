import Head from "next/head";
import BaseLayout from "~/components/BaseLayout";
import NotFound from "~/components/NotFound";
import {
  LOGO_IMAGE_HEIGHT,
  LOGO_IMAGE_TYPE,
  LOGO_IMAGE_URL,
  LOGO_IMAGE_WIDTH,
} from "~/constants/text";

const NotFoundPage: React.FC<void> = () => {
  return (
    <>
      <Head>
        <title>zzal.me - 등록되지 않은 짤입니다.</title>
        <meta name="og:description" content="짤을 등록 후 사용해주세요." />
        <meta property="og:image" content={LOGO_IMAGE_URL} />
        <meta property="og:image:url" content={LOGO_IMAGE_URL} />
        <meta property="og:image:secure_url" content={LOGO_IMAGE_URL} />
        <meta property="og:image:type" content={LOGO_IMAGE_TYPE} />
        <meta property="og:image:width" content={LOGO_IMAGE_WIDTH} />
        <meta property="og:image:height" content={LOGO_IMAGE_HEIGHT} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BaseLayout>
        <NotFound />
      </BaseLayout>
    </>
  );
};

export default NotFoundPage;
