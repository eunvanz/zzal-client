import { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next";
import api from "~/api";
import { catchServerSideError } from "~/helpers/errorHelpers";
import { Content } from "~/types";
import { CommonContentDetail, ContentDetailPageProps } from "./index.page";

const ContentDetailPage: React.FC<ContentDetailPageProps> = ({ content }) => {
  return <CommonContentDetail content={content} />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;

  const { path, all } = params as { path: string; all: string[] };

  try {
    let content: Content;
    if (path === "r" && !!all.length) {
      content = await api.getRandomContent(all.join("/"));
    } else {
      content = await api.getContent(`${path}/${all.join("/")}`);
    }
    return {
      props: {
        content,
      },
    };
  } catch (error) {
    return catchServerSideError(error as AxiosError);
  }
}

export default ContentDetailPage;
