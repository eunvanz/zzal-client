import Head from "next/head";
import BaseLayout from "~/components/BaseLayout";
import NotFound from "~/components/NotFound";

const NotFoundPage: React.FC<void> = () => {
  return (
    <>
      <Head>
        <title>zzal.me - 등록되지 않은 짤입니다.</title>
        <meta name="og:description" content="짤을 등록 후 사용해주세요." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BaseLayout>
        <NotFound />
      </BaseLayout>
    </>
  );
};

export default NotFoundPage;
