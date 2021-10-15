import { useQuery, UseQueryOptions } from "react-query";
import { QUERY_KEY } from "~/types";
import api from "../api";

const useExistingPathQuery = (path: string, queryOptions?: UseQueryOptions<boolean>) => {
  const query = useQuery<boolean>(
    QUERY_KEY.EXISTING_CONTENT,
    () => api.checkIsExistingPath(path),
    { ...queryOptions },
  );
  return query;
};

export default useExistingPathQuery;
