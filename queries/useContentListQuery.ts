import { UseInfiniteQueryOptions } from "react-query";
import api from "~/api";
import { Content, CONTENT_ORDER, Pageable, QUERY_KEY } from "~/types";
import useCommonInfiniteQuery from "./useCommonInfiniteQuery";

const useContentListQuery = (
  orderBy: CONTENT_ORDER,
  tags?: string[],
  queryOptions?: UseInfiniteQueryOptions<Pageable<Content>>,
) => {
  const query = useCommonInfiniteQuery<Content>(
    QUERY_KEY.CONTENT_LIST,
    (pageOptions) => api.getContentList({ orderBy, tags, ...pageOptions }),
    queryOptions,
  );
  return query;
};

export default useContentListQuery;
