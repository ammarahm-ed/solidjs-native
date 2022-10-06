const webpack = require("@nativescript/webpack");
const {
  getPlatformName,
} = require("@nativescript/webpack/dist/helpers/platform");

const solid = (config) => {
  const platform = getPlatformName();

  config.resolve.extensions
    .prepend(".tsx")
    .prepend(`.${platform}.tsx`)
    .prepend(`.${platform}.ts`);

  config.output.devtoolNamespace("app");
  config.optimization.minimize(false);
  config.optimization.usedExports(false);
  config.optimization.providedExports(false);
  config.optimization.end();
  config.devServer.hotOnly(true);
  config.devServer.hot(true);

  config.module
    .rule("bundle-source")
    .test(/\.(|t|j)sx?$/)
    .exclude.add(/node_modules/)
    .end()
    .use("babel-loader")
    .loader("babel-loader")
    .before("ts-loader")
    .options({
      babelrc: false,
      configFile: false,
      presets: [
        [
          "babel-preset-solid",
          {
            moduleName: "@dominative/solid",
            generate: "universal",
          },
        ],
      ],
      plugins: [
        [
          "solid-refresh/babel",
          {
            bundler: "webpack5",
          },
        ],
      ],
    });
};

module.exports = (env) => {
  webpack.init(env);
  webpack.chainWebpack(solid);
  return webpack.resolveConfig();
};
