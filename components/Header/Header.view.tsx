import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Box
            sx={{
              fontFamily: "'Jua', sans-serif",
            }}
          >
            <Typography
              sx={{
                color: "secondary.main",
              }}
              component="span"
            >
              zzal
            </Typography>
            <Typography component="span">.me</Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
