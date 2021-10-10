import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#333652",
      light: "rgb(91, 94, 116)",
      dark: "rgb(35, 37, 57)",
    },
    secondary: {
      main: "#FAD02C",
    },
  },
};

export const theme = createTheme(themeOptions);
