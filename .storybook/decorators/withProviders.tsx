import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider } from "react-query";
import { theme } from "../../helpers/themeHelpers";
import queryClient from "../../queries/queryClient";

const withProviders = (Story: any) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  </QueryClientProvider>
);

export default withProviders;
