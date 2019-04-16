import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import AnchorTag from '~/library/AnchorTag'
import ImageLoader from '~/library/ImageLoader'
import linkedInBtnSrc from '~/assets/img/linkedin_btn.png'


const Root = styled.section`
  display: flex;
  flex-direction: column;
`

const H2 = styled.h2`
  align-self: center;
`

function About() {
  return (
    <Root>
      <H2>About</H2>
      <AnchorTag
        url='https://www.linkedin.com/in/julianhr/'
        isLinkRouted={false}
        isTargetBlank
      >
        <ImageLoader
          maxWidth={200}
          maxHeight={37}
          imgSrc={linkedInBtnSrc}
        />
      </AnchorTag>
    </Root>
  )
}

export default About
