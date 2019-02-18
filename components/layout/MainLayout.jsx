/* @jsx jsx */
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import { Global } from '@emotion/core'
import styled from '@emotion/styled'

import globalStyles from '../../library/styles/global-styles'
import { Row, responsive } from '../../library/'
import HtmlHead from './HtmlHead'
import TopNav from '../top_nav/TopNav'


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
        <Row
          as='main'
          style={{ maxWidth: responsive.breaks.lg }}
        >
          <TopNav />
          {props.children}
        </Row>
      </Root>
    </>
  )
}

export default MainLayout
