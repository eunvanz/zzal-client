import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { getMergedPageData } from "~/helpers/projectHelpers";
import useContentListQuery from "~/queries/useContentListQuery";
import ROUTES from "~/routes";
import { CONTENT_ORDER } from "~/types";
import { MainProps } from "./Main.view";

const useMainProps: () => MainProps = () => {
  const [order, setOrder] = useState(CONTENT_ORDER.POPULARITY);

  const router = useRouter();

  const { search } = router.query;

  const keywordToSearch = useMemo(() => {
    return Array.isArray(search) ? search[0] : search;
  }, [search]);

  const [keyword, setKeyword] = useState(keywordToSearch || "");

  const { data, fetchNextPage, hasNextPage, refetch, isFetching } = useContentListQuery({
    orderBy: order,
    keyword: keyword || undefined,
  });

  const contents = useMemo(() => {
    return data ? getMergedPageData(data.pages) : undefined;
  }, [data]);

  useEffect(() => {
    setKeyword(keywordToSearch || "");
  }, [keywordToSearch]);

  useEffect(() => {
    if (order || keyword) {
      refetch();
    }
  }, [keyword, order, refetch]);

  const onSearch = useCallback(
    (value: string) => {
      router.push(`${ROUTES.ROOT}?search=${value}`);
    },
    [router],
  );

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
