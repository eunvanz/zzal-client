import { AxiosError } from "axios";
import { GetStaticPropsContext, NextPage } from "next";
import api from "~/api";
import { catchServerSideError } from "~/helpers/errorHelpers";
import { Content } from "~/types";
import CommonContentDetail, { ContentDetailPageProps } from "./CommonContentDetail.view";

export const ContentDetailPage: NextPage<ContentDetailPageProps> = ({ content }) => {
  return <CommonContentDetail content={content} />;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;

  const { path } = params as { path: string };

  try {
    const isRandom = path.startsWith("랜덤");
    let content: Content;
    if (isRandom) {
      const tagName = path.replace("랜덤", "");
      content = await api.getRandomContent(tagName);
    } else {
      content = await api.getContent(path);
    }
    return {
      props: {
        content,
      },
      revalidate: 60,
    };
  } catch (error) {
    return catchServerSideError(error as AxiosError);
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export default ContentDetailPage;
