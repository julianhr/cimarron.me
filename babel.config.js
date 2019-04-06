module.exports = api => {
  const isTest = Boolean(api.env('test'))
  const isProd = Boolean(api.env('production'))

  api.cache(true)

  return {
    presets: [
      [
        '@babel/env',
        {
          useBuiltIns: 'usage',
          corejs: 3,
          targets: isTest ? { node: 'current' } : null,
        }
      ],
      '@babel/react',
      [
        '@emotion/css-prop',
        {
          useBuiltIns: true,
        }
      ]
    ],
    plugins: [
      [
        'emotion',
        {
          sourceMap: isProd ? false : !isTest,
        }
      ],
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
