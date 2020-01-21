const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractSASS = new ExtractTextPlugin("./[name].[hash].css");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const webpack = require("webpack");
const pages = require("./src/content");
const renderedPages = pages.map(
  page =>
    new HtmlWebpackPlugin({
      template: page.template,
      filename: page.output
      // TODO
      // title: page.content.title,
      // description: page.content.description
    })
);

module.exports = options => {
  let webpackConfig = {
    devtool:
      process.env.NODE_ENV === "development" ? "cheap-eval-source-map" : "",
    entry: ["./src/app.js"],
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].[hash].js"
    },
    plugins: [
      // TODO: use below instead of inline import jquery
      // new webpack.ProvidePlugin({
      //   $: "jquery",
      //   jQuery: "jquery",
      //   "window.jQuery": "jquery",
      //   Tether: "tether",
      //   "window.Tether": "tether",
      //   Popper: ["popper.js", "default"]
      // }),
      new CopyWebpackPlugin([
        { from: "./src/assets/images", to: "./assets/images" }
      ]),
      new CopyWebpackPlugin([
        { from: "./src/assets/fonts", to: "./assets/fonts" }
      ]),
      new CopyWebpackPlugin([{ from: "./src/assets/js", to: "./assets/js" }]),
      new CopyWebpackPlugin([{ from: "./src/assets/css", to: "./assets/css" }]),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
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
          test: /\.(gif|jpg|png)$/,
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "./assets/images"
          }
        }
      ]
    }
  };

  if (process.env.NODE_ENV === "production") {
    webpackConfig.entry = ["./src/app.js"];

    webpackConfig.plugins.push(
      ExtractSASS,
      new CleanWebpackPlugin(["dist"], {
        verbose: true,
        dry: false
      })
    );

    webpackConfig.module.rules.push(
      {
        test: /\.scss$/i,
        use: ExtractSASS.extract(["css-loader", "sass-loader"])
      },
      {
        test: /\.css$/i,
        use: ExtractSASS.extract(["css-loader"])
      }
    );
  } else {
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    webpackConfig.module.rules.push(
      {
        test: /\.scss$/i,
        use: [
          "style-loader?sourceMap",
          "css-loader?sourceMap",
          "sass-loader?sourceMap"
        ]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    );

    webpackConfig.devServer = {
      port: process.env.NODE_ENV === "development" ? 8081 : null,
      contentBase: path.join("dist"),
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
          port: 3001,
          proxy: "http://localhost:8081/",
          files: [
            {
              match: ["**/*.hbs"],
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
