import { AxiosError } from "axios";
import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import api from "~/api";
import { catchServerSideError } from "~/helpers/errorHelpers";
import useContentByPathQuery from "~/queries/useContentByPathQuery";
import { Content } from "~/types";
import Registration from "./Registration.view";
import useRegistrationProps from "./useRegistrationProps";

export interface RegistrationPageProps {
  content: Content | null;
}

const RegistrationPage: NextPage<RegistrationPageProps> = ({ content }) => {
  const { data } = useContentByPathQuery(content?.path, {
    initialData: content || undefined,
    enabled: false,
  });

  const props = useRegistrationProps({ content: data || null });

  return (
    <>
      <Head>
        <title>zzal.me - 짤 등록</title>
      </Head>
      <Registration {...props} />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;

  const { path } = params as { path: string };

  try {
    if (path === "new") {
      return {
        props: {
          content: null,
        },
      };
    } else {
      const content = await api.getContent(path);
      return {
        props: {
          content,
        },
      };
    }
  } catch (error) {
    return catchServerSideError(error as AxiosError);
  }
}

export default RegistrationPage;
