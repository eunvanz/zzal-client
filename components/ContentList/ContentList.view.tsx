import { useCallback, useState } from "react";
import { Box } from "@mui/material";
import Masonry from "react-masonry-component";
import { Content } from "~/types";
import ContentItem from "../ContentItem";
import ContentModal from "../ContentModal";
import style from "./ContentList.module.css";

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
      <Masonry options={{ gutter: 4 }}>
        {contents.map((content) => (
          <ContentItem
            key={content.id}
            className={style.item}
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
