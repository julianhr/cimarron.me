const breaks = {
  md: 600,
  lg: 900,
}

const queries = {
  sm: `@media (max-width: ${breaks.md - 1}px)`,
  md: `@media (min-width: ${breaks.md}px) and (max-width: ${breaks.lg - 1}px)`,
  lg: `@media (min-width: ${breaks.lg}px)`,
}

export default {
  breaks,
  queries,
}
