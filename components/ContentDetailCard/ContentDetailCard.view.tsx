import { useEffect, forwardRef } from "react";
import {
  AddOutlined,
  CloseOutlined,
  ContentCopyOutlined,
  ModeEditOutlineOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import Clipboard from "clipboard";
import { useRouter } from "next/dist/client/router";
import { useSnackbar } from "notistack";
import ROUTES from "~/routes";
import { Content } from "~/types";

export interface ContentDetailCardProps {
  content: Content;
  onClose?: VoidFunction;
}

// eslint-disable-next-line
const ContentDetailCard = forwardRef<HTMLDivElement, ContentDetailCardProps>(
  ({ content, onClose }, forwardedRef) => {
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
      <Card sx={{ boxShadow: 20 }} ref={forwardedRef}>
        <CardMedia
          component="img"
          image={content.images[content.images.length - 1]?.url}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box>
              <IconButton
                aria-label="링크 복사"
                id="copy-to-clipboard"
                data-clipboard-text={`https://zzal.me/${content.path}`}
              >
                <ContentCopyOutlined />
              </IconButton>
              {!content.userId && (
                <IconButton
                  aria-label="짤 수정"
                  size="small"
                  onClick={() => router.push(`${ROUTES.REGISTRATION}/${content.path}`)}
                >
                  <ModeEditOutlineOutlined />
                </IconButton>
              )}
            </Box>

            {onClose ? (
              <IconButton aria-label="닫기" onClick={onClose}>
                <CloseOutlined />
              </IconButton>
            ) : (
              <IconButton
                aria-label="다른 짤 추가"
                onClick={() => router.push(ROUTES.REGISTRATION__NEW)}
              >
                <AddOutlined />
              </IconButton>
            )}
          </Box>
        </CardActions>
      </Card>
    );
  },
);

export default ContentDetailCard;
