import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import { theme } from "~/helpers/themeHelpers";
import queryClient from "~/queries/queryClient";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <Component {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default MyApp;
