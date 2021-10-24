import { UseInfiniteQueryOptions } from "react-query";
import api from "~/api";
import { Content, CONTENT_ORDER, Pageable, QUERY_KEY } from "~/types";
import useCommonInfiniteQuery from "./useCommonInfiniteQuery";

export interface UseContentListQueryOptions {
  orderBy: CONTENT_ORDER;
  keyword?: string;
}
const useContentListQuery = (
  options: UseContentListQueryOptions,
  queryOptions?: UseInfiniteQueryOptions<Pageable<Content>>,
) => {
  const query = useCommonInfiniteQuery<Content>(
    QUERY_KEY.CONTENT_LIST,
    (pageOptions) => api.getContentList({ ...options, ...pageOptions }),
    queryOptions,
  );
  return query;
};

export default useContentListQuery;
