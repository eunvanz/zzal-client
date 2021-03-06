import { AxiosError } from "axios";
import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import api from "~/api";
import { catchServerSideError } from "~/helpers/errorHelpers";
import { Content } from "~/types";
import Registration from "./Registration.view";
import useRegistrationProps from "./useRegistrationProps";

export interface RegistrationPageProps {
  content: Content | null;
}

const RegistrationPage: NextPage<RegistrationPageProps> = ({ content }) => {
  const props = useRegistrationProps({ content });

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

  const { path, all } = params as { path: string; all: string[] };

  try {
    const content = await api.getContent(`${path}/${all.join("/")}`);
    return {
      props: {
        content,
      },
    };
  } catch (error) {
    return catchServerSideError(error as AxiosError);
  }
}

export default RegistrationPage;
