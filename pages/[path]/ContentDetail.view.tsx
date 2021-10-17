import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/dist/client/router";
import { Content } from "~/types";

export interface ContentDetailProps {
  content: Content;
}

const ContentDetail: React.FC<ContentDetailProps> = ({ content }) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        bgcolor: grey[200],
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          height: "100vh",
        }}
      >
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card>
            <CardMedia
              component="img"
              image={content.images[0].url}
              alt={content.title || "untitled"}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {content.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {content.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => router.push("/registration")}>
                다른 짤 등록하기
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default ContentDetail;
