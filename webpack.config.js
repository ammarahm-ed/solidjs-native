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

  config.resolve.extensions
    .prepend(".tsx")
    .prepend(`.${platform}.tsx`)
    .prepend(`.${platform}.ts`);
  config.output.devtoolNamespace("app");

  config.optimization.minimize(false);
  config.optimization.usedExports(false);
  config.optimization.providedExports(false);

  config.optimization.end();

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
      presets: ["solid"],
    });

  return config;
}
