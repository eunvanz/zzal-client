import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#333652",
    },
    secondary: {
      main: "#FAD02C",
    },
  },
  typography: {
    fontFamily: ["Noto Sans KR", "sans-serif"].join(","),
  },
};

export const theme = createTheme(themeOptions);
