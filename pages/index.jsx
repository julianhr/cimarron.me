/* @jsx jsx */
import 'sanitize.css'
import { jsx } from '@emotion/core'

import HtmlHead from '../library/components/HtmlHead'


export default () => {
  return (
    <>
      <HtmlHead />
      <p css={{color: 'salmon'}}>Testing App</p>
    </>
  )
}
