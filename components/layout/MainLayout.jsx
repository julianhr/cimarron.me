/* @jsx jsx */
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import { Global } from '@emotion/core'
import styled from '@emotion/styled'

import HtmlHead from './HtmlHead'
import globalStyles from '../../library/styles/global-styles'


const Root = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

function MainLayout(props) {
  return (
    <>
      <HtmlHead />
      <Global styles={globalStyles} />
      <Root>
        {props.children}
      </Root>
    </>
  )
}

export default MainLayout
