import { Box } from "@mui/material";

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
            mb: 0.5,
          }}
        >
          {title}
        </Box>
        {description && (
          <Box
            sx={{
              color: "text.secondary",
              mb: 0.5,
            }}
          >
            {description}
          </Box>
        )}
        <Box
          sx={{
            color: "text.disabled",
          }}
        >
          zzal.me
        </Box>
      </Box>
    </Box>
  );
};

export default Preview;
