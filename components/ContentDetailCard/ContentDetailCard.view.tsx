import { forwardRef, useCallback } from "react";
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
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/dist/client/router";
import useCopyToClipboard from "~/hooks/useCopyToClipboard";
import ROUTES from "~/routes";
import { Content, Tag } from "~/types";

export interface ContentDetailCardProps {
  content: Content;
  onClose?: VoidFunction;
}

// eslint-disable-next-line
const ContentDetailCard = forwardRef<HTMLDivElement, ContentDetailCardProps>(
  ({ content, onClose }, forwardedRef) => {
    const router = useRouter();

    const { copyToClipboard } = useCopyToClipboard();

    const handleOnClickTag = useCallback(
      (tag: Tag) => {
        router.push(`${ROUTES.ROOT}?search=${tag.name}`);
        onClose?.();
      },
      [onClose, router],
    );

    return (
      <Card sx={{ boxShadow: 20 }} ref={forwardedRef}>
        <CardMedia
          component="img"
          image={content.images[content.images.length > 1 ? 1 : 0]?.url}
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
                <Chip
                  sx={{ mr: 0.5, mb: 0.5, cursor: "pointer" }}
                  key={tag.id}
                  label={tag.name}
                  onClick={() => handleOnClickTag(tag)}
                />
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
              <Tooltip title="?????? ??????" placement="top">
                <IconButton
                  aria-label="?????? ??????"
                  onClick={() =>
                    copyToClipboard(`${process.env.SERVICE_HOST}/${content.path}`)
                  }
                >
                  <ContentCopyOutlined />
                </IconButton>
              </Tooltip>
              {!content.userId && (
                <Tooltip title="??? ??????" placement="top">
                  <IconButton
                    aria-label="??? ??????"
                    size="small"
                    onClick={() => router.push(`${ROUTES.REGISTRATION}/${content.path}`)}
                  >
                    <ModeEditOutlineOutlined />
                  </IconButton>
                </Tooltip>
              )}
            </Box>

            {onClose ? (
              <Tooltip title="??????" placement="top">
                <IconButton aria-label="??????" onClick={onClose}>
                  <CloseOutlined />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="?????? ??? ??????" placement="top">
                <IconButton
                  aria-label="?????? ??? ??????"
                  onClick={() => router.push(ROUTES.REGISTRATION__NEW)}
                >
                  <AddOutlined />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </CardActions>
      </Card>
    );
  },
);

export default ContentDetailCard;
