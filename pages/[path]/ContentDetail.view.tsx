import { useEffect } from "react";
import { AddOutlined, LinkOutlined } from "@mui/icons-material";
import {
  Container,
  Box,
  Typography,
  Button,
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import Clipboard from "clipboard";
import { useRouter } from "next/dist/client/router";
import { useSnackbar } from "notistack";
import ContentDetailCard from "~/components/ContentDetailCard";
import { Content } from "~/types";

export interface ContentDetailProps {
  content: Content;
}

const ContentDetail: React.FC<ContentDetailProps> = ({ content }) => {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const clipboard = new Clipboard("#copy-to-clipboard");
    clipboard.on("success", () => {
      enqueueSnackbar("링크가 복사되었습니다.");
    });
    return () => {
      clipboard.destroy();
    };
  }, [enqueueSnackbar]);

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
          <ContentDetailCard content={content} />
        </Box>
      </Container>
    </Box>
  );
};

export default ContentDetail;
