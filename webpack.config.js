const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpack = require('webpack');
const path = require('path');

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    ui: './src/ui/ui.tsx', // The entry point for your UI code
    code: './src/plugin/code.ts', // The entry point for your plugin code
  },

  module: {
    rules: [
      // Converts TypeScript code to JavaScript
      {
        test: /\.tsx?$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ].filter(Boolean),
      },

      // Enables including CSS by doing "import './file.css'" in your TypeScript code
      {
        test: /\.css$/,
        loader: [{loader: 'style-loader'}, {loader: 'css-loader'}],
      },

      // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
      {
        test: /\.(png|jpg|gif|webp|svg|zip)$/,
        exclude: /node_modules/,
        loader: [{loader: 'url-loader'}],
      },
    ],
  },

  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
    jsonpFunction: `webpackJsonp_${__filename}`,
  },

  optimization: {
    minimize: argv.mode === 'production' ? true : false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {},
      }),
    ],
  },

  // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
  plugins: [
    new BundleAnalyzerPlugin(),
    argv.PREVIEW_ENV === 'browser' && new ReactRefreshPlugin(),
    argv.PREVIEW_ENV === 'browser' && new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/ui/ui.html',
      filename: 'ui.html',
      inlineSource: '.(js|css)$',
      chunks: ['ui'],
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        PREVIEW_ENV: JSON.stringify(argv.PREVIEW_ENV),
      },
    }),
  ].filter(Boolean),
});
