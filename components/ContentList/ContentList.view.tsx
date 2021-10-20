import Masonry from "@mui/lab/Masonry";
import { Content } from "~/types";
import ContentItem from "../ContentItem";

export interface ContentListProps {
  contents: Content[];
}

const ContentList: React.FC<ContentListProps> = ({ contents }) => {
  return (
    <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 5 }} spacing={1}>
      {contents.map((content) => (
        <ContentItem key={content.id} content={content} />
      ))}
    </Masonry>
  );
};

export default ContentList;
