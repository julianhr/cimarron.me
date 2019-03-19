const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
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

  return {
    entry: {
      main: './src/Root.jsx',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, 'src'),
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/env',
                {
                  useBuiltIns: 'usage'
                }
              ],
              '@babel/react',
              '@emotion/css-prop'
            ],
            plugins: [
              'emotion',
              '@babel/proposal-class-properties',
              '@babel/syntax-dynamic-import',
            ],
          }
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
              }
            }
          ]
  
        }
      ]
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(), // so file hashes won't change unexpectedly
      new CleanWebpackPlugin(),
      new CopyPlugin([{ from: 'public', to: '.' }]),
      new DuplicatesPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
    ],
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      alias: {
        '~': path.resolve(__dirname, 'src')
      }
    },
    optimization: {
      /*
      many ideas taken from
      https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
      */
      runtimeChunk: 'single',
      splitChunks: {
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            test: /node_modules/,
            chunks: 'all',
            name(module) {
              // get package name and group file under it
              const pnpmSignature = '.registry.npmjs.org'
              const pnpmRegEx = /\.registry\.npmjs\.org\/([^/]+)\//
              const npmRegEx = /node_modules\/([^/]+)\//
              const npmPackageNameRegex =
                module.context.includes(pnpmSignature) ? pnpmRegEx : npmRegEx
              const packageName = module.context.match(npmPackageNameRegex)[1]
              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`
            },
            priority: 20,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'async',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          },
        },
      },
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      chunkFilename: '[name].[contenthash].js',
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
