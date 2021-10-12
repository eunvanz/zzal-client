import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import api from "~/api";
import { DEFAULT_TITLE } from "~/constants/text";
import { Content } from "~/types";
import ContentDetail from "./ContentDetail.view";

export interface ContentDetailPageProps {
  content: Content;
}

export const CommonContentDetail = ({ content }: ContentDetailPageProps) => {
  const image = content.images[0];

  return (
    <>
      <Head>
        <title>{content.title || DEFAULT_TITLE}</title>
        {content.description && (
          <meta property="og:description" content={content.description} />
        )}
        <meta property="og:image" content={image.url} />
        <meta property="og:image:url" content={image.url} />
        <meta property="og:image:secure_url" content={image.url} />
        <meta property="og:image:type" content={image.type} />
        <meta property="og:image:width" content={image.width.toString()} />
        <meta property="og:image:height" content={image.height.toString()} />
      </Head>
      <ContentDetail content={content} />;
    </>
  );
};

export const ContentDetailPage: React.FC<ContentDetailPageProps> = ({ content }) => {
  return <CommonContentDetail content={content} />;
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
