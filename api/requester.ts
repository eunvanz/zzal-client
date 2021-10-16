import axios, { AxiosError } from "axios";
import Alert from "~/components/Alert";
import ROUTES from "~/routes";

const instance = axios.create({
  baseURL: process.env.API_HOST,
});
instance.defaults.withCredentials = true;
instance.defaults.timeout = 30_000;

instance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  async (error: AxiosError) => {
    if (typeof window === "undefined") {
      throw error;
    }
    const { response } = error;
    if (response) {
      const { status } = response;
      switch (status) {
        case 401:
          window.location.assign(ROUTES.SIGN_IN);
          return;
        case 403:
          await Alert.show({ content: "권한이 없습니다." });
          window.location.assign(ROUTES.COMMON_ERROR);
          return;
        case 404:
          window.location.assign(ROUTES.NOT_FOUND);
          return;
      }
    }
  },
);

export default instance;
