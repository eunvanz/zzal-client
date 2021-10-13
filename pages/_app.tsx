import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { theme } from "~/helpers/themeHelpers";
import "../styles/globals.css";

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
