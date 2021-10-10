import { Box, Typography } from "@mui/material";

export interface PreviewProps {
  thumbnail?: string;
  title?: string;
  description?: string;
}

const Preview: React.FC<PreviewProps> = ({
  thumbnail,
  title = "zzal.me - share your memes",
  description,
}) => {
  return (
    <Box
      sx={{
        borderRadius: 10,
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {thumbnail && (
        <Box
          sx={{
            "& img": {
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
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
          p: 1,
        }}
      >
        <Box
          sx={{
            color: "text.primary",
            fontSize: "small",
            mb: 0.5,
          }}
        >
          {title}
        </Box>
        {description && (
          <Box
            sx={{
              color: "text.secondary",
              fontSize: "small",
              mb: 0.5,
            }}
          >
            {description}
          </Box>
        )}
        <Box
          sx={{
            color: "text.disabled",
            fontSize: "small",
          }}
        >
          zzal.me
        </Box>
      </Box>
    </Box>
  );
};

export default Preview;
