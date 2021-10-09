const path = require("path");

module.exports = {
  stories: ["../**/*.stories.mdx", "../**/*.stories.tsx"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        "next/image": require.resolve("./__mocks__/NextJSImageMock.js"),
        "~": path.resolve(__dirname, "../"),
      },
    };
    return config;
  },
};
