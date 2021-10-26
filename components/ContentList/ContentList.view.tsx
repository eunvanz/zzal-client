import { useCallback, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { debounce } from "lodash-es";
import { Masonry } from "masonic";
import { useWindowSize } from "react-use";
import { Content } from "~/types";
import ContentItem, { ContentItemProps } from "../ContentItem";
import ContentModal from "../ContentModal";

export interface ContentListProps {
  contents: Content[];
}

const ContentList: React.FC<ContentListProps> = ({ contents }) => {
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

  // eslint-disable-next-line
  const refreshMasonry = useCallback(
    debounce(() => {
      setRefreshKey((refreshedCnt) => ++refreshedCnt);
    }, 500),
    [],
  );

  useEffect(() => {
    refreshMasonry();
  }, [refreshMasonry, width, contents]);

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
      />
      {contentModalState.content && (
        // @ts-ignore
        <ContentModal {...contentModalState} onClose={handleOnCloseModal} />
      )}
    </Box>
  );
};

const WrappedContentItem = ({
  data: { content, onClick },
}: {
  data: ContentItemProps;
}) => {
  return <ContentItem content={content} onClick={onClick} />;
};

export default ContentList;
