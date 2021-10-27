import Head from "next/head";
import Link from "next/link";
import ROUTES from "~/routes";

const NotFoundPage: React.FC<void> = () => {
  return (
    <>
      <Head>
        <title>zzal.me - 등록되지 않은 짤입니다.</title>
        <meta name="og:description" content="짤을 등록 후 사용해주세요." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2>등록되지 않은 짤입니다.</h2>
        <Link href={ROUTES.REGISTRATION__NEW}>짤 등록하러 가기</Link>
      </main>
    </>
  );
};

export default NotFoundPage;
