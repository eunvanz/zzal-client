import { useEffect } from "react";
import { ContentCopyOutlined } from "@mui/icons-material";
import MasonryItem from "@mui/lab/MasonryItem";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import Clipboard from "clipboard";
import { useRouter } from "next/dist/client/router";
import { useSnackbar } from "notistack";
import { Content } from "~/types";

export interface ContentItemProps {
  content: Content;
}

const ContentItem: React.FC<ContentItemProps> = ({ content }) => {
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
    <MasonryItem>
      <Card variant="outlined">
        <CardMedia
          component="img"
          image={content.images[content.images.length - 1]?.url}
          alt={content.title || "untitled"}
        />
        <CardContent
          sx={{ cursor: "pointer" }}
          onClick={() => router.push(`/${content.path}`)}
        >
          <Typography gutterBottom variant="body1" component="div">
            {content.title}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            {content.description}
          </Typography>
          <Typography variant="body2" color="text.disabled">
            zzal.me/{content.path}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            endIcon={<ContentCopyOutlined />}
            id="copy-to-clipboard"
            data-clipboard-text={`https://zzal.me/${content.path}`}
          >
            링크 복사
          </Button>
        </CardActions>
      </Card>
    </MasonryItem>
  );
};

export default ContentItem;
