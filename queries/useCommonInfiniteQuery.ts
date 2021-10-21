import { QueryKey, useInfiniteQuery, UseInfiniteQueryOptions } from "react-query";
import { Pageable, PageRequestOptions } from "~/types";

const useCommonInfiniteQuery = <T>(
  key: QueryKey,
  api: (param: PageRequestOptions) => Promise<Pageable<T>>,
  queryOptions?: UseInfiniteQueryOptions<Pageable<T>>,
) => {
  const query = useInfiniteQuery<Pageable<T>>(
    key,
    ({ pageParam = 1 }) => api({ page: pageParam }),
    {
      ...queryOptions,
      getNextPageParam: ({ meta: { totalPages, currentPage } }) =>
        totalPages <= currentPage ? undefined : currentPage + 1,
    },
  );
  return query;
};

export default useCommonInfiniteQuery;
