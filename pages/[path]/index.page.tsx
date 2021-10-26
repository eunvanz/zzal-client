import { AxiosError } from "axios";
import { GetServerSidePropsContext, NextPage } from "next";
import api from "~/api";
import { catchServerSideError } from "~/helpers/errorHelpers";
import { Content } from "~/types";
import CommonContentDetail, { ContentDetailPageProps } from "./CommonContentDetail.view";

export const ContentDetailPage: NextPage<ContentDetailPageProps> = ({ content }) => {
  return <CommonContentDetail content={content} />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
    };
  } catch (error) {
    return catchServerSideError(error as AxiosError);
  }
}

export default ContentDetailPage;
