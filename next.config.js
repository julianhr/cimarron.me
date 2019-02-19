const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  webpack(config, options) {
    const { dev } = options

    if (dev) {
      config.module.rules.push(...[
        // eslint
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          enforce: 'pre',
          loader: 'eslint-loader',
          options: {
            emitWarning: Boolean(dev)
          }
        }
      ])
    } else {
      config.devtool = 'source-map'
    }

    return config
  }
})
