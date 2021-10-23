import { useState, useCallback } from "react";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import MasonryItem from "@mui/lab/MasonryItem";
import { Card, CardMedia, Box, Typography, IconButton } from "@mui/material";
import copy from "copy-to-clipboard";
import { useSnackbar } from "notistack";
import { Content } from "~/types";

export interface ContentItemProps {
  content: Content;
  onClick: VoidFunction;
}

const ContentItem: React.FC<ContentItemProps> = ({ content, onClick }) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOnCopyLink = useCallback(
    (e) => {
      e.stopPropagation();
      copy(`https://zzal.me/${content.path}`);
      enqueueSnackbar("링크가 복사되었습니다.");
    },
    [content.path, enqueueSnackbar],
  );

  return (
    <MasonryItem>
      <Card
        sx={{ cursor: "pointer", position: "relative" }}
        variant="outlined"
        onClick={onClick}
        onMouseOver={() => setIsInfoVisible(true)}
        onMouseOut={() => setIsInfoVisible(false)}
      >
        <CardMedia
          component="img"
          image={content.images[content.images.length - 1]?.url}
          alt={content.title || "untitled"}
        />
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, .5)",
            height: 30,
            px: 1,
            display: "flex",
            alignItems: "center",
            transform: `translateY(-${isInfoVisible ? 30 : 0}px)`,
            transition: "transform 250ms",
          }}
        >
          <Typography variant="body2" color="white">
            zzal.me/{content.path}{" "}
            <IconButton size="small" sx={{ color: "white" }} onClick={handleOnCopyLink}>
              {/* @ts-ignore */}
              <ContentCopyOutlinedIcon fontSize="6px" />
            </IconButton>
          </Typography>
        </Box>
      </Card>
    </MasonryItem>
  );
};

export default ContentItem;
