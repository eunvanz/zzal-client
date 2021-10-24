import { useCallback, useEffect, useMemo, useState } from "react";
import { getMergedPageData } from "~/helpers/projectHelpers";
import useContentListQuery from "~/queries/useContentListQuery";
import { CONTENT_ORDER } from "~/types";
import { MainProps } from "./Main.view";

const useMainProps: () => MainProps = () => {
  const [order, setOrder] = useState(CONTENT_ORDER.POPULARITY);

  const [keyword, setKeyword] = useState("");

  const { data, fetchNextPage, hasNextPage, refetch, isFetching } = useContentListQuery({
    orderBy: order,
    keyword: keyword || undefined,
  });

  const contents = useMemo(() => {
    return data ? getMergedPageData(data.pages) : undefined;
  }, [data]);

  useEffect(() => {
    if (order || keyword) {
      refetch();
    }
  }, [keyword, order, refetch]);

  const onSearch = useCallback((value: string) => {
    setKeyword(value);
  }, []);

  return {
    contents,
    onFetchNextPage: fetchNextPage,
    hasNextPage,
    order,
    onChangeOrder: setOrder,
    onSearch,
    isSearching: isFetching,
    keyword,
    totalItems: data?.pages[0].meta.totalItems,
  };
};

export default useMainProps;
