import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { theme } from "~/helpers/themeHelpers";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}
export default MyApp;
