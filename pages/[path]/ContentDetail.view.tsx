import { Container, Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { Content } from "~/types";

export interface ContentDetailProps {
  content: Content;
}

const ContentDetail: React.FC<ContentDetailProps> = ({ content }) => {
  const router = useRouter();

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            maxWidth: "100%",
            "& img": {
              maxWidth: "100%",
            },
          }}
        >
          {/* eslint-disable-next-line */}
          <img src={content.images[0].url} alt={content.title || "untitled"} />
        </Box>
        <Typography variant="h5" sx={{ my: 1 }}>
          {content.title}
        </Typography>
        <Typography variant="body1">{content.description}</Typography>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => router.push("/registration")}
          >
            다른 짤 등록하기
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ContentDetail;
