import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import api from "~/api";
import { DEFAULT_TITLE } from "~/constants/text";
import { Content } from "~/types";
import ContentDetail from "./ContentDetail.view";

export interface ContentDetailPageProps {
  content: Content;
}

const ContentDetailPage: React.FC<ContentDetailPageProps> = ({ content }) => {
  return (
    <>
      <Head>
        <title>{content.title || DEFAULT_TITLE}</title>
        {content.description && (
          <meta property="og:description" content={content.description} />
        )}
        <meta property="og:image" content={content.images[0].url} />
        <meta property="og:image:url" content={content.images[0].url} />
        <meta property="og:image:secure_url" content={content.images[0].url} />
        <meta property="og:image:type" content={content.images[0].type} />
        <meta property="og:image:width" content={content.images[0].width.toString()} />
        <meta property="og:image:height" content={content.images[0].height.toString()} />
      </Head>
      <ContentDetail content={content} />;
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;
  const { path } = params as { path: string };

  const content = await api.getContent(path);

  return {
    props: {
      content,
    },
  };
}

export default ContentDetailPage;
