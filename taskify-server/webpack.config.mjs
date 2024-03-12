import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import webpackNodeExternals from "webpack-node-externals";
import Dotenv from "dotenv-webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
  mode: "production",
  target: "node",
  entry: "./src/server.js",
  externals: [webpackNodeExternals()],
  output: {
    path: resolve(__dirname, "dist"),
    filename: "server.cjs",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: "./.env",
    }),
  ],
};

export default config;
