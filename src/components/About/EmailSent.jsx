import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import imgSrc from '~/assets/img/thumbs_up.png'
import ImageLoader from '~/library/ImageLoader'


const Root = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0 0;

  h3 {
    color: ${props => props.theme.colors.text};
  }
`


function EmailSent() {
  return (
    <Root>
      <ImageLoader
        maxWidth={339}
        maxHeight={364}
        imgSrc={imgSrc}
        shouldFadeIn={false}
      />
      <h3
        css={{ marginBottom: 0 }}
      >
        Message successfully sent
      </h3>
      <h3>Thank you!</h3>
    </Root>
  )
}

export default EmailSent
