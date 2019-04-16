import { css } from '@emotion/core'
import theme from './theme'

const globalStyles = css`
  body {
    color: ${theme.colors.text},
    lineHeight 1.3em;
    font-size: 18px;
  }

  input, textarea {
    border: 2px solid ${theme.colors.field.border};
    background: ${theme.colors.field.background};
    border-radius: 5px;
    font-size: 20px;
  }

  input, textarea {
    border: 1px solid ${theme.colors.field.border};
    background: ${theme.colors.field.background};
    font-size: 1.1em;
    padding: 4px 8px;
  }

  p, h1, h2, h3, h4, h5, h6, figure {
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${theme.colors.primary.dark};
  }

  p {
    padding: .8em 0;
    line-height: 1.4em;
  }

  h1 {
    font-size: 36px;
    margin: 50px 0 40px;
  }

  h2 {
    line-height: 1.4em;
    font-size: 30px;
    font-weight: 600;
    margin: 40px 0 30px;
  }

  h3 {
    font-size: 24px;
    font-weight: 600;
    margin: 30px 0 30px;
  }

  h4 {
    line-height: 1.3em;
    font-size: 18px;
  }

  h5 {
    font-size: 12px;
  }

  h6 {
    font-size: 8px;
  }

  code {
    color: ${theme.colors.code};
    font-size: 14;
  }
`

export default globalStyles
