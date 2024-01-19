const merge = require("webpack-merge");
const base = require("./base");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge.merge(base, {
  mode: "production",
  output: {
    filename: "bundle.min.js",
    publicPath: '/',
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  }
});
