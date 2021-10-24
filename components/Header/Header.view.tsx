import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import ROUTES from "~/routes";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Box
            sx={{
              cursor: "pointer",
              "& span": {
                fontFamily: "'Jua', sans-serif",
              },
              flexGrow: 1,
            }}
            onClick={() => router.push(ROUTES.ROOT)}
          >
            <Typography
              sx={{
                color: "secondary.main",
              }}
              variant="h5"
              component="span"
            >
              짤
            </Typography>
            <Typography variant="h5" component="span">
              .미
            </Typography>
          </Box>
          <Button color="inherit" onClick={() => router.push(ROUTES.REGISTRATION__NEW)}>
            짤 등록
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
