import { isNumber } from 'lodash-es'


export const API_SUB_DOMAINS = new Set('api.flask api.rails api.node'.split(' '))

export function urlBuilder(basePath, query={}, basePort, api='api.flask') {
  if (!API_SUB_DOMAINS.has(api)) { throw new Error('invalid api argument') }

  basePath = basePath.trim()
  const isProduction = process.env.NODE_ENV === 'production'
  const host = isProduction ? `https://${api}.cimarron.me` : 'http://localhost'
  const port = isNumber(basePort) ? `:${basePort}` : (isProduction ? '' : ':5000')

  let path = basePath[0] === '/' ? basePath : `/${basePath}`
  path += path.length > 1 && path[path.length - 1] !== '/' ? '/' : ''

  const urlBase = host + port + path
  const urlQuery = Object.entries(query).map(([key, val]) => `${key}=${val}`).join('&')
  const url = `${urlBase}` + (urlQuery ? `?${urlQuery}` : '')
  return url
}

export function getRangeArray(min, max, isString=false) {
  const range = []

  for (let num = min; num <= max; num++) {
    range.push( isString ? num.toString() : num )
  }

  return range
}
