module.exports = api => {
  const isTest = Boolean(api.env('test'))

  api.cache(true)

  return {
    presets: [
      [
        '@babel/env',
        {
          useBuiltIns: 'usage',
          corejs: 3,
        }
      ],
      '@babel/react',
      '@emotion/css-prop'
    ],
    plugins: [
      'emotion',
      'lodash',
      '@babel/proposal-class-properties',
      '@babel/syntax-dynamic-import',
    ],
    env: {
      'test': {
        plugins: ["dynamic-import-node"]
      }
    }
  }
}
