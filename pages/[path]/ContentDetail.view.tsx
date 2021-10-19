import { Container, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import ContentDetailCard from "~/components/ContentDetailCard";
import { Content } from "~/types";

export interface ContentDetailProps {
  content: Content;
}

const ContentDetail: React.FC<ContentDetailProps> = ({ content }) => {
  return (
    <Box
      sx={{
        bgcolor: grey[200],
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          height: "100vh",
        }}
      >
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <ContentDetailCard content={content} />
        </Box>
      </Container>
    </Box>
  );
};

export default ContentDetail;
