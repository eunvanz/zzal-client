import { Box, Typography, useTheme, Button } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import ROUTES from "~/routes";

export interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = ({}) => {
  const theme = useTheme();

  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: {
          xs: `calc(100vh - ${theme.spacing(7)})`,
          sm: `calc(100vh - ${theme.spacing(8)})`,
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 2,
      }}
    >
      <Typography variant="h5" sx={{ mb: 1 }}>
        등록되지 않은 짤입니다.
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        짤을 등록 후 사용해주세요.
      </Typography>
      <Button variant="contained" onClick={() => router.push(ROUTES.REGISTRATION__NEW)}>
        짤 등록하기
      </Button>
    </Box>
  );
};

export default NotFound;
