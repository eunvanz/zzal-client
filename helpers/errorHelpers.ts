import { AxiosError } from "axios";
import ROUTES from "~/routes";

export const catchServerSideError = (error: AxiosError) => {
  const { response } = error;
  if (response) {
    const { status } = response;
    switch (status) {
      case 404:
        return {
          redirect: {
            destination: ROUTES.NOT_FOUND,
            permanent: false,
          },
        };
      default:
        return {
          redirect: {
            destination: ROUTES.COMMON_ERROR,
            permanent: false,
          },
        };
    }
  }
};
