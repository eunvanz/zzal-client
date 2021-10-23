import { useEffect, useMemo, useState } from "react";
import { getMergedPageData } from "~/helpers/projectHelpers";
import useContentListQuery from "~/queries/useContentListQuery";
import { CONTENT_ORDER } from "~/types";
import { MainProps } from "./Main.view";

const useMainProps: () => MainProps = () => {
  const [order, setOrder] = useState(CONTENT_ORDER.POPULARITY);

  const { data, fetchNextPage, hasNextPage, refetch } = useContentListQuery({
    orderBy: order,
  });

  const contents = useMemo(() => {
    return data ? getMergedPageData(data.pages) : undefined;
  }, [data]);

  useEffect(() => {
    if (order) {
      refetch();
    }
  }, [order, refetch]);

  return {
    contents,
    onFetchNextPage: fetchNextPage,
    hasNextPage,
    order,
    onChangeOrder: setOrder,
  };
};

export default useMainProps;
