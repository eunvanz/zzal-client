import { useMemo } from "react";
import { getMergedPageData } from "~/helpers/projectHelpers";
import useContentListQuery from "~/queries/useContentListQuery";
import { CONTENT_ORDER } from "~/types";
import { MainProps } from "./Main.view";

const useMainProps: () => MainProps = () => {
  const { data, fetchNextPage, hasNextPage } = useContentListQuery({
    orderBy: CONTENT_ORDER.POPULARITY,
  });

  const contents = useMemo(() => {
    return data ? getMergedPageData(data.pages) : undefined;
  }, [data]);

  return {
    contents,
    onFetchNextPage: fetchNextPage,
    hasNextPage,
  };
};

export default useMainProps;
