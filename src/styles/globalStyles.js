import { css } from '@emotion/core'
import theme from './theme'

const globalStyles = css`
  body {
    color: ${theme.colors.text},
    lineHeight 1.3em;
  }

  p, h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${theme.colors.primary.dark};
  }

  p {
    padding: .8em 0;
  }

  h1 {
    font-size: 44;
  }

  h2 {
    line-height: 2em;
    font-size: 34;
    font-weight: 500;
  }

  h3 {
    font-size: 24;
    font-weight: 600;
  }

  h4 {
    line-height: 1.3em;
    font-size: 18;
  }

  h5 {
    font-size: 12;
  }

  h6 {
    font-size: 8;
  }
  
  code {
    color: ${theme.colors.code};
    font-size: 14;
  }
`

export default globalStyles
