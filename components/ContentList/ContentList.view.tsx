import { useCallback, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { Masonry, useInfiniteLoader } from "masonic";
import { useWindowSize } from "react-use";
import { Content } from "~/types";
import ContentItem, { ContentItemProps } from "../ContentItem";
import ContentModal from "../ContentModal";

export interface ContentListProps {
  contents: Content[];
  onLoadMore: VoidFunction;
  totalItems?: number;
}

const ContentList: React.FC<ContentListProps> = ({
  contents,
  onLoadMore,
  totalItems,
}) => {
  const [contentModalState, setContentModalState] = useState<{
    content?: Content;
    isOpen: boolean;
  }>({ isOpen: false });

  const handleOnCloseModal = useCallback(() => {
    setContentModalState((state) => ({ ...state, isOpen: false }));
  }, []);

  const { width } = useWindowSize();

  const columnCount = useMemo(() => {
    if (width >= 600 && width < 900) {
      return 3;
    } else if (width >= 900 && width < 1200) {
      return 4;
    } else if (width >= 1200) {
      return 5;
    } else {
      return 2;
    }
  }, [width]);

  const [refreshKey, setRefreshKey] = useState(0);

  const loadMore = useInfiniteLoader(onLoadMore, {
    isItemLoaded: (index, items) => !!items[index],
    totalItems,
  });

  return (
    <Box sx={{ width: "100%", maxWidth: 1200 }}>
      <Masonry
        key={refreshKey}
        items={contents.map((content) => ({
          content,
          onClick: () => setContentModalState({ content, isOpen: true }),
        }))}
        columnGutter={4}
        columnCount={columnCount}
        render={WrappedContentItem}
        onRender={loadMore}
      />
      {contentModalState.content && (
        // @ts-ignore
        <ContentModal {...contentModalState} onClose={handleOnCloseModal} />
      )}
    </Box>
  );
};

const WrappedContentItem = ({
  index,
  data: { content, onClick },
}: {
  index: number;
  data: ContentItemProps;
}) => {
  return <ContentItem key={index} content={content} onClick={onClick} />;
};

export default ContentList;
