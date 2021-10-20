import { Container, Box, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import BaseLayout from "~/components/BaseLayout";
import ContentDetailCard from "~/components/ContentDetailCard";
import { Content } from "~/types";

export interface ContentDetailProps {
  content: Content;
}

const ContentDetail: React.FC<ContentDetailProps> = ({ content }) => {
  const theme = useTheme();

  return (
    <BaseLayout>
      <Box
        sx={{
          bgcolor: grey[200],
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              minHeight: {
                xs: `calc(100vh - ${theme.spacing(7)})`,
                sm: `calc(100vh - ${theme.spacing(8)})`,
              },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 2,
            }}
          >
            <ContentDetailCard content={content} />
          </Box>
        </Container>
      </Box>
    </BaseLayout>
  );
};

export default ContentDetail;
