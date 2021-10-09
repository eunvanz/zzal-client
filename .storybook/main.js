const path = require("path");

module.exports = {
  stories: ["../**/*.stories.mdx", "../**/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-css-modules-preset",
  ],
  webpackFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        "next/image": require.resolve("./__mocks__/NextJSImageMock.js"),
        "~": path.resolve(__dirname, "../"),
      },
    };
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    });
    return config;
  },
};
