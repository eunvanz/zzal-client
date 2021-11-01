import { useCallback, useState } from "react";
import Masonry from "@mui/lab/Masonry";
import { Box, Stack } from "@mui/material";
import { Content } from "~/types";
import ContentItem from "../ContentItem";
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

  return (
    <Box sx={{ width: "100%", minHeight: 100 }}>
      <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 5 }} spacing={1}>
        {contents.map((content) => (
          <Stack key={content.id}>
            <ContentItem
              content={content}
              onClick={() => setContentModalState({ content, isOpen: true })}
            />
          </Stack>
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
