import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import SvgImage from '~/assets/img/suspicious_emoji.svg'


const Root = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0 0;
  text-align: center;

  h2 {
    color: ${props => props.theme.colors.text};
  }
`


function EmailSent() {
  return (
    <Root>
      <h2
        css={{ marginBottom: 80 }}
      >
        That was an awefully suspicious email
      </h2>
      <SvgImage
        width={240}
        height={240}
      />
      <h2
        css={{ marginTop: 80 }}
      >
        I have reported it to my detective minions
      </h2>
    </Root>
  )
}

export default EmailSent
