import { AxiosError } from "axios";
import { GetStaticPropsContext } from "next";
import api from "~/api";
import { catchServerSideError } from "~/helpers/errorHelpers";
import CommonContentDetail, { ContentDetailPageProps } from "./CommonContentDetail.view";

const ContentDetailPage: React.FC<ContentDetailPageProps> = ({ content }) => {
  return <CommonContentDetail content={content} />;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;

  const { path, all } = params as { path: string; all: string[] };

  try {
    const content = await api.getContent(`${path}/${all.join("/")}`);
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
