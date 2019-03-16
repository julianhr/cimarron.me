const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// open Markdown links in new tab
// https://github.com/markedjs/marked/issues/655
const marked = require('marked')
const mdRenderer = new marked.Renderer()
const mdRendererLink = mdRenderer.link
mdRenderer.link = (href, title, text) => {
    const html = mdRendererLink.call(mdRenderer, href, title, text)
    return html.replace(/^<a /, '<a target="_blank" rel="noopener noreferrer" ')
}


module.exports = {
  entry: ['@babel/polyfill', './src/Root.jsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react', '@emotion/css-prop'],
          plugins: [
            "@babel/proposal-class-properties",
            "@babel/syntax-dynamic-import"
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
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000,
    // open: true,
  },
}
