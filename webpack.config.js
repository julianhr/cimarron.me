const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { DuplicatesPlugin } = require("inspectpack/plugin")
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

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

  return {
    entry: {
      main: './src/index.js',
      InfiniteScroller: './src/labs/001_InfiniteScroller/index.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, 'src'),
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.md$/,
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
  
        }
      ]
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(), // consistent file hashes based on their content
      new LodashModuleReplacementPlugin,
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/views/index.ejs',
        hash: true,
        chunks: 'main vendors react redux commons'.split(' ')
      }),
      new HtmlWebpackPlugin({
        filename: 'labs/infinite-scroller/index.html',
        template: './src/views/index.ejs',
        hash: true,
        chunks: 'InfiniteScroller vendors react redux commons'.split(' ')
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
    // incorporates ideas from
    // https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
    optimization: {
      runtimeChunk: false,
      splitChunks: {
        minSize: 0,
        maxInitialRequests: Infinity,
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            test: /node_modules\/(?!(react|redux|lodash))/,
            name: 'vendors',
            chunks: 'all',
          },
          react: {
            test: /node_modules\/react/,
            name: 'react',
            chunks: 'all',
          },
          redux: {
            test: /node_modules\/redux/,
            name: 'redux',
            chunks: 'all',
          },
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2
          }
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
