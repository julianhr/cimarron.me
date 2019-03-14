const validApiSubDomains = new Set('api.flask api.rails api.node'.split(' '))

export function urlBuilder(basePath, query={}, basePort, api='api.flask') {
  if (!validApiSubDomains.has(api)) { throw new Error('invalid api argument') }

  basePath = basePath.trim()
  const isProduction = process.env.NODE_ENV === 'production'
  const host = isProduction ? `http://${api}.cimarron.me` : 'http://localhost'
  const port = basePort === undefined ? (isProduction ? '80' : '5000') : basePort
  const path = basePath.length > 0 && basePath[0] === '/' ? basePath.slice(1) : basePath
  const urlBase = `${host}:${port}/${path}`
  const urlQuery = Object.entries(query).map(([key, val]) => `${key}=${val}`).join('&')

  return `${urlBase}/?${urlQuery}`
}

export function clamp(value, min, max) {
  return Math.min( Math.max(value, min), max )
}

export function getRangeArray(min, max, isString=false) {
  const range = []

  for (let num = min; num <= max; num++) {
    range.push( isString ? num.toString() : num )
  }

  return range
}
