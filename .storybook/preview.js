import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "~/helpers/themeHelpers";
import "~/styles/global.css";

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
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  )
];
