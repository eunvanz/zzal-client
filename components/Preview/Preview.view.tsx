import { Box } from "@mui/material";
import { DEFAULT_TITLE } from "~/constants/text";
import { Content } from "~/types";

export interface PreviewProps {
  thumbnail?: string;
  title?: Content["title"];
  description?: Content["description"];
}

const Preview: React.FC<PreviewProps> = ({ thumbnail, title, description }) => {
  return (
    <Box
      sx={{
        borderRadius: 3,
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {thumbnail && (
        <Box
          sx={{
            "& img": {
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
              width: "100%",
            },
          }}
        >
          {/* eslint-disable-next-line */}
          <img src={thumbnail} alt="thumbnail" />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 1.5,
        }}
      >
        <Box
          sx={{
            color: "text.primary",
            mb: description ? 0.5 : 0,
          }}
        >
          {title || DEFAULT_TITLE}
        </Box>
        {description && (
          <Box
            sx={{
              color: "text.secondary",
            }}
          >
            {description}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Preview;
