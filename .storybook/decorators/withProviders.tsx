import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { theme } from "../../helpers/themeHelpers";
import queryClient from "../../queries/queryClient";

const withProviders = (Story: any) => (
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <Story />
        </SnackbarProvider>
      </ThemeProvider>
    </RecoilRoot>
  </QueryClientProvider>
);

export default withProviders;
