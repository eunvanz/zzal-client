import { useMemo } from "react";
import { UseInfiniteQueryResult } from "react-query";
import { getMergedPageData } from "~/helpers/projectHelpers";
import { Pageable } from "~/types";

const useList = <T>(useInfiniteQuery: () => UseInfiniteQueryResult<Pageable<T>>) => {
  const { data: listData, fetchNextPage, hasNextPage } = useInfiniteQuery();

  const data = useMemo(() => {
    return listData ? getMergedPageData(listData.pages) : undefined;
  }, [listData]);

  return {
    hasNextPage,
    fetchNextPage,
    data,
  };
};

export default useList;
