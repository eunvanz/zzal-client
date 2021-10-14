import { GetServerSidePropsContext } from "next";
import api from "~/api";
import { CommonContentDetail, ContentDetailPageProps } from "./index.page";

const ContentDetailPage: React.FC<ContentDetailPageProps> = ({ content }) => {
  return <CommonContentDetail content={content} />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;

  const { path, all } = params as { path: string; all: string[] };

  const content = await api.getContent(`${path}/${all.join("/")}`);

  return {
    props: {
      content,
    },
  };
}

export default ContentDetailPage;
