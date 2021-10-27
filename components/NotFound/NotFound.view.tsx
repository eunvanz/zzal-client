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
      <Typography variant="h5" sx={{ mb: 2 }}>
        등록되지 않은 짤입니다.
      </Typography>
      <Button variant="contained" onClick={() => router.push(ROUTES.REGISTRATION__NEW)}>
        새로운 짤 등록하기
      </Button>
    </Box>
  );
};

export default NotFound;
