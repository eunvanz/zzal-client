import { useCallback, useState } from "react";
import Masonry from "@mui/lab/Masonry";
import { Box } from "@mui/material";
import { Content } from "~/types";
import ContentItem from "../ContentItem";
import ContentModal from "../ContentModal";

export interface ContentListProps {
  contents: Content[];
  width: number;
}

const ContentList: React.FC<ContentListProps> = ({ contents, width }) => {
  const [contentModalState, setContentModalState] = useState<{
    content?: Content;
    isOpen: boolean;
  }>({ isOpen: false });

  const handleOnCloseModal = useCallback(() => {
    setContentModalState((state) => ({ ...state, isOpen: false }));
  }, []);

  return (
    <Box sx={{ width, minHeight: 100 }}>
      <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 5 }} spacing={1}>
        {contents.map((content) => (
          <ContentItem
            key={content.id}
            content={content}
            onClick={() => setContentModalState({ content, isOpen: true })}
          />
        ))}
      </Masonry>
      {contentModalState.content && (
        // @ts-ignore
        <ContentModal {...contentModalState} onClose={handleOnCloseModal} />
      )}
    </Box>
  );
};

export default ContentList;
