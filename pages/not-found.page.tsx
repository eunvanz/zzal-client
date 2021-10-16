import Head from "next/head";
import Link from "next/link";

const NotFoundPage: React.FC<void> = () => {
  return (
    <>
      <Head>
        <title>zzal.me - 등록되지 않은 짤입니다.</title>
        <meta name="description" content="손쉽게 짤 링크를 생성하고 공유하세요." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2>등록되지 않은 짤입니다.</h2>
        <Link href="/registration">짤 등록하러 가기</Link>
      </main>
    </>
  );
};

export default NotFoundPage;
