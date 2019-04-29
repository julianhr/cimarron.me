const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const { DuplicatesPlugin } = require("inspectpack/plugin")

// open Markdown links in new tab
// https://github.com/markedjs/marked/issues/655
const marked = require('marked')
const mdRenderer = new marked.Renderer()
const mdRendererLink = mdRenderer.link
mdRenderer.link = (href, title, text) => {
    const html = mdRendererLink.call(mdRenderer, href, title, text)
    return html.replace(/^<a /, '<a target="_blank" rel="noopener noreferrer" ')
}

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production'

  if (isProd) {
    process.env.COMMIT_HASH = (process.env.COMMIT_REF || 'missing').slice(0, 8)
  }
  else {
    process.env.COMMIT_HASH =
      require('child_process').execSync('git rev-parse --short HEAD').toString().trim()
  }

  return {
    entry: {
      main: './src/index.js',
      InfiniteScroller: './src/labs/001_InfiniteScroller/index.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/i,
          include: path.resolve(__dirname, 'src'),
          loader: 'babel-loader',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.md$/i,
          use: [
            'html-loader',
            {
              loader: 'markdown-loader',
              options: { renderer: mdRenderer }
            }
          ],
        },
        {
          test: /\.(bmp|png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: '[name].[contenthash:8].[ext]',
              }
            }
          ]
        },
        {
          test: /\.svg$/i,
          loader: 'react-svg-loader',
        }
      ]
    },
    plugins: [
      new Dotenv(),
      new webpack.EnvironmentPlugin(['SENTRY_DSN', 'COMMIT_HASH']),
      new webpack.HashedModuleIdsPlugin(), // consistent file hashes based on their content
      new LodashModuleReplacementPlugin,
      new CleanWebpackPlugin(),
      // https://github.com/jantimon/html-webpack-plugin/issues/218#issuecomment-183066602
      // https://github.com/jantimon/html-webpack-plugin/issues/218#issuecomment-372305762
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/views/index.ejs',
        hash: true,
        excludeChunks: ['InfiniteScroller'],
        templateParameters: {
          title: 'Julian Hernandez - Personal Website'
        }
      }),
      new HtmlWebpackPlugin({
        filename: 'labs/infinite-scroller/index.html',
        template: './src/views/index.ejs',
        hash: true,
        excludeChunks: ['main'],
        templateParameters: {
          title: 'Infinite Scroller - Julian Hernandez'
        }
      }),
      new CopyPlugin([{ from: 'public', to: '.' }]),
      new DuplicatesPlugin(),
    ],
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      alias: {
        '~': path.resolve(__dirname, 'src')
      }
    },
    optimization: {
      runtimeChunk: false,
      splitChunks: {
        maxInitialRequests: Infinity,
        cacheGroups: {
          default: false,
          vendors: {
            test: /node_modules/,
            name: 'vendors',
            chunks: 'all',
            maxSize: 300 * 1000, // 300 KB
          },
        },
      },
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      chunkFilename: '[name].[contenthash:8].js',
      publicPath: '/',
    },
    devtool: 'inline-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      port: 3000,
      // open: true,
    },
  }
}
