import MasonryItem from "@mui/lab/MasonryItem";
import { Card, CardMedia } from "@mui/material";
import { Content } from "~/types";

export interface ContentItemProps {
  content: Content;
  onClick: VoidFunction;
}

const ContentItem: React.FC<ContentItemProps> = ({ content, onClick }) => {
  return (
    <MasonryItem>
      <Card sx={{ cursor: "pointer" }} variant="outlined" onClick={onClick}>
        <CardMedia
          component="img"
          image={content.images[content.images.length - 1]?.url}
          alt={content.title || "untitled"}
        />
      </Card>
    </MasonryItem>
  );
};

export default ContentItem;
