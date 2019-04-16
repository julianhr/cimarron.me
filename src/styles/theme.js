export const colors = {
  background: '#FFF',
  code: '#D90000',
  error: '#d400ff',
  field: {
    background: '#f7f7f7',
    border: '#BBB',
  },
  highlight: '#FFD342',
  text: '#222222',
  primary: {
    dark: '#9B1518',
    light: '#CE1F23',
    dim: '#FFA8AA',
  },
}

export const breaks = {
  xs: 0,
  sm: 420,
  md: 900,
  lg: 1200,
}

export const breakBump = {
  xs: 'sm',
  sm: 'md',
  md: 'lg',
}

export const queries = {
  xs: `@media (max-width: ${breaks.sm - 1}px)`,
  sm: `@media (min-width: ${breaks.sm}px) and (max-width: ${breaks.md - 1}px)`,
  md: `@media (min-width: ${breaks.md}px) and (max-width: ${breaks.lg - 1}px)`,
  lg: `@media (min-width: ${breaks.lg}px)`,
  from: (breakPoint) => (`@media (min-width: ${breaks[breakPoint]}px)`),
  upTo: (breakPoint) => (`@media (max-width: ${breaks[ breakBump[breakPoint] ] - 1}px)`),
}

const theme = {
  colors,
  breaks,
  queries,
}

export default theme
