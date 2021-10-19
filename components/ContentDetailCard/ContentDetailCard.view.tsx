import { useEffect } from "react";
import {
  AddOutlined,
  ContentCopyOutlined,
  ModeEditOutlineOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import Clipboard from "clipboard";
import { useRouter } from "next/dist/client/router";
import { useSnackbar } from "notistack";
import ROUTES from "~/routes";
import { Content } from "~/types";

export interface ContentDetailCardProps {
  content: Content;
}

const ContentDetailCard: React.FC<ContentDetailCardProps> = ({ content }) => {
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
    <Card sx={{ boxShadow: 20 }}>
      <CardMedia
        component="img"
        image={content.images.pop()?.url}
        alt={content.title || "untitled"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {content.title}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          {content.description}
        </Typography>
        {!!content.tags.length && (
          <Box
            sx={{
              my: 2,
            }}
          >
            {content.tags.map((tag) => (
              <Chip sx={{ mr: 0.5, mb: 0.5 }} key={tag.id} label={tag.name} />
            ))}
          </Box>
        )}
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
        {!content.userId && (
          <Button
            size="small"
            onClick={() => router.push(`${ROUTES.REGISTRATION}/${content.path}`)}
            endIcon={<ModeEditOutlineOutlined />}
          >
            짤 수정
          </Button>
        )}
        <Button
          size="small"
          onClick={() => router.push(ROUTES.REGISTRATION__NEW)}
          endIcon={<AddOutlined />}
        >
          다른 짤 등록
        </Button>
      </CardActions>
    </Card>
  );
};

export default ContentDetailCard;
