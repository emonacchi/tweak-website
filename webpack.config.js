const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const webpack = require("webpack");
const ip = require("ip");

const pages = require("./src/content");

const GA_KEY_STAGING = "UA-151413843-3";
const GA_KEY_PRODUCTION = "UA-151413843-4";
const gaKey = process.env.NODE_ENV === "development" ? GA_KEY_STAGING : GA_KEY_PRODUCTION;
const isAnalyticsActive = process.env.NODE_ENV === "production" || process.env.GOOGLE_ANALYTICS === "on";

const proxy = "http://localhost:8081/";
const port = process.env.NODE_ENV === "development" ? 3001 : "";
let baseUrl = proxy;

if (process.env.NODE_ENV === 'development') {
  const ipAddr = ip.address();

  if (ipAddr) {
    baseUrl = port ? `http://${ipAddr}:${port}/` : `https://${ipAddr}/`;
  }
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = "https://tweak-extension.com/"
}

const common = {
  baseUrl,
  gaKey,
  isAnalyticsActive
};

console.info("Running with the common configurations:", common);

const renderedPages = pages.map(
  page =>
    new HtmlWebpackPlugin({
      ...common,
      template: page.template,
      filename: page.output,
      content: page.content
    })
);

module.exports = options => {
  let webpackConfig = {
    devtool:
      process.env.NODE_ENV === "development" ? "cheap-eval-source-map" : "",
    entry: ["./src/assets/js/main.js"],
    output: {
      path: path.join(__dirname, "docs"),
      filename: "[name].[hash].js"
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: "./src/assets/images", to: "./assets/images" }
      ]),
      new CopyWebpackPlugin([{ from: "./src/assets/js", to: "./assets/js" }]),
      new CopyWebpackPlugin([{ from: "./src/assets/css", to: "./assets/css" }]),
      // favicon from: https://favicon.io/favicon-converter/
      new CopyWebpackPlugin([{ from: "./src/assets/favicon", to: "." }]),
      // privacy policies
      new CopyWebpackPlugin([{ from: "./src/privacy-policy.txt", to: "." }]),
      new CopyWebpackPlugin([{ from: "./src/use-policy.txt", to: "." }]),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),
      new MiniCssExtractPlugin({
        filename:
          process.env.NODE_ENV === "development"
            ? "[name].css"
            : "[name].[hash].css",
        chunkFilename:
          process.env.NODE_ENV === "development"
            ? "[id].css"
            : "[id].[hash].css"
      })
    ],
    module: {
      rules: [
        {
          test: /\.hbs$/,
          loader: "handlebars-loader",
          query: {
            partialDirs: [
              path.join(__dirname, "src", "layouts"),
              path.join(__dirname, "src", "components"),
              path.join(__dirname, "src", "pages")
            ]
          }
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "./assets/fonts"
              }
            }
          ]
        },
        {
          test: /\.(gif|jpg|png|jpeg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "./assets/images"
              }
            }
          ]
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === "development"
              }
            },
            "css-loader",
            "sass-loader"
          ]
        }
      ]
    }
  };

  if (process.env.NODE_ENV === "production") {
    webpackConfig.entry = ["./src/assets/js/main.js"];
    webpackConfig.plugins.push(new CleanWebpackPlugin());
    webpackConfig.optimization = {
      minimizer: [new UglifyJsPlugin()]
    };
  } else {
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    webpackConfig.devServer = {
      port: process.env.NODE_ENV === "development" ? 8081 : null,
      contentBase: path.join("docs"),
      historyApiFallback: true,
      compress: process.env.NODE_ENV === "production",
      inline: process.env.NODE_ENV === "development",
      hot: process.env.NODE_ENV === "development",
      stats: {
        chunks: false
      }
    };

    webpackConfig.plugins.push(
      new BrowserSyncPlugin(
        {
          host: "localhost",
          port,
          proxy,
          files: [
            {
              match: ["**/*"],
              fn: function(event, file) {
                if (
                  event === "change" ||
                  event === "add" ||
                  event === "unlink"
                ) {
                  const bs = require("browser-sync").get("bs-webpack-plugin");
                  bs.reload();
                }
              }
            }
          ]
        },
        {
          reload: false
        }
      )
    );
  }

  webpackConfig.plugins = webpackConfig.plugins.concat(renderedPages);

  return webpackConfig;
};
