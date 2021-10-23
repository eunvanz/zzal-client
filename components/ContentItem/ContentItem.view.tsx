import { useState, useCallback } from "react";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import MasonryItem from "@mui/lab/MasonryItem";
import { Card, CardMedia, Box, Typography, IconButton } from "@mui/material";
import { isMobile } from "react-device-detect";
import useCopyToClipboard from "~/hooks/useCopyToClipboard";
import { Content } from "~/types";

export interface ContentItemProps {
  content: Content;
  onClick: VoidFunction;
}

const ContentItem: React.FC<ContentItemProps> = ({ content, onClick }) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const { copyToClipboard } = useCopyToClipboard();

  const handleOnCopyLink = useCallback(
    (e) => {
      e.stopPropagation();
      copyToClipboard(`${process.env.SERVICE_HOST}/${content.path}`);
    },
    [content.path, copyToClipboard],
  );

  return (
    <MasonryItem>
      <Card
        sx={{ cursor: "pointer", position: "relative" }}
        variant="outlined"
        onClick={onClick}
        onMouseOver={isMobile ? undefined : () => setIsInfoVisible(true)}
        onMouseOut={isMobile ? undefined : () => setIsInfoVisible(false)}
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
          {!isMobile && (
            <Typography variant="body2" color="white">
              zzal.me/{content.path}{" "}
              <IconButton size="small" sx={{ color: "white" }} onClick={handleOnCopyLink}>
                {/* @ts-ignore */}
                <ContentCopyOutlinedIcon fontSize="6px" />
              </IconButton>
            </Typography>
          )}
        </Box>
      </Card>
    </MasonryItem>
  );
};

export default ContentItem;
