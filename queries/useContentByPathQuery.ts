import { useQuery, UseQueryOptions } from "react-query";
import { Content, QUERY_KEY } from "~/types";
import api from "../api";

const useContentByPathQuery = (
  path?: string,
  queryOptions?: UseQueryOptions<Content>,
) => {
  const query = useQuery<Content>(QUERY_KEY.CONTENT, () => api.getContent(path || ""), {
    ...queryOptions,
  });
  return query;
};

export default useContentByPathQuery;
