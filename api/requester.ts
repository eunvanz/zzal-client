import axios, { AxiosError } from "axios";

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
    if (typeof window === "undefined") return;
    const { response } = error;
    if (response) {
      const {
        status,
        data,
        config: { method },
      } = response;
      // TODO:
    }
  },
);

export default instance;
