const webpack = require("@nativescript/webpack");
const {
  getPlatformName,
} = require("@nativescript/webpack/dist/helpers/platform");

module.exports = (env) => {
  webpack.init(env);
  webpack.useConfig("base");
  const config = solid(webpack.resolveChainableConfig(), env);
  return config.toConfig();
};

/**
 *
 * @param {import('webpack-chain')} config
 * @param {*} env
 * @returns
 */
function solid(config, env) {
  const platform = getPlatformName();
  const mode = env.production ? "production" : "development";
  const production = mode === "production";
  console.log("mode", production);
  config.resolve.extensions
    .prepend(".tsx")
    .prepend(".ts")
    .prepend(".js")
    .prepend(".jsx")
    .prepend(`.${platform}.tsx`)
    .prepend(`.${platform}.ts`)
    .prepend(`.${platform}.js`);

  if (mode === "development") {
    config.output.devtoolNamespace("app");
    config.devServer.hotOnly(true);
    config.devServer.hot(true);
    config.module
      .rule("ts")
      .test(/\.(t|j)sx?$/)
      .exclude.add(/node_modules/)
      .end()
      .use("babel-loader")
      .loader("babel-loader")
      .options({
        babelrc: false,
        configFile: false,
        presets: [
          "solid",
          "@babel/typescript",
          [
            "@babel/env",
            {
              useBuiltIns: "usage",
              corejs: "3.25.0",
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
  } else {
    config.optimization.minimize(false);
    config.module
      .rule("ts")
      .test(/\.(t|j)sx?$/)
      .exclude.add(/node_modules/)
      .end()
      .use("babel-loader")
      .loader("babel-loader")
      .options({
        babelrc: false,
        configFile: false,
        presets: [
          "solid",
          "@babel/typescript",
          [
            "@babel/env",
            {
              useBuiltIns: "usage",
              corejs: "3.25.0",
            },
          ],
        ],
      });
  }

  return config;
}
