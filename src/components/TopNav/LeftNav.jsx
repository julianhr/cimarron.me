import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import config from '~/config'


const Root = styled.div`
  display: flex;
  flex-direction: column;
`

const H3 = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 20px;
  font-weight: 400;
  margin: 0;
`

const H6 = styled.h6`
  padding-top: 4px;
  font-size: 11px;
  font-weight: 300;
  margin: 0;
  color: #999;
`

function LeftNav() {
  return (
    <Root>
      <H3>{config.author.name}</H3>
      <H6>{config.author.title}</H6>
    </Root>
  )
}

export default LeftNav
