import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider } from "react-query";
import { theme } from "~/helpers/themeHelpers";
import queryClient from "~/queries/queryClient";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  layout: "fullscreen",
};

export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </QueryClientProvider>
  )
]
