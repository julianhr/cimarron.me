import React from 'react'
import PropTypes from 'prop-types'
import { css, keyframes } from '@emotion/core'
import styled from '@emotion/styled'


const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
`

const Container = styled.div`
  display: flex;
  font-size: 24px;
`

const bounceDot = keyframes`
  0%, 14% {
    transform: translateY(0);
  }

  7% {
    transform: translateY(-14px);
  }
`

const spanBase = css`
  font-size: 34px;
  padding: 0 3px;
  margin-top: -7px;
`

const Dot1 = styled.span`
  ${spanBase}
  animation: ${bounceDot} 1400ms ease-in 0s infinite;
`

const Dot2 = styled.span`
  ${spanBase}
  animation: ${bounceDot} 1400ms ease-in 280ms infinite;
`

const Dot3 = styled.span`
  ${spanBase}
  animation: ${bounceDot} 1400ms ease-in 560ms infinite;
`

function Loading() {
  return (
    <Root>
      <Container>
        <span>Loading</span><Dot1>.</Dot1><Dot2>.</Dot2><Dot3>.</Dot3>
      </Container>
    </Root>
  )
}

export default Loading
