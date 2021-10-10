import Head from "next/head";
import Registration from "./Registration.view";
import useRegistrationProps from "./useRegistrationProps";

const RegistrationPage: React.FC<void> = () => {
  const props = useRegistrationProps();

  return (
    <>
      <Head>
        <title></title>
      </Head>
      <Registration {...props} />;
    </>
  );
};

export default RegistrationPage;
