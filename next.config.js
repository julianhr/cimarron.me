const withCSS = require('@zeit/next-css')

module.exports = (nextConfig={}) => {
  return withCSS({...nextConfig, ...{
    webpack(config, options) {
      const { dev, isServer } = options
      const { cssModules, cssLoaderOptions, postcssLoaderOptions } = nextConfig

      return config
    }
  }})
}
