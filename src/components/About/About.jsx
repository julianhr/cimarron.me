import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import ErrorBoundary from '~/library/ErrorBoundary'
import AnchorTag from '~/library/AnchorTag'
import ImageLoader from '~/library/ImageLoader'
import linkedInBtnSrc from '~/assets/img/linkedin_btn.png'
import Contact from './Contact'


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
        rootStyle={{ display: 'contents' }}
      >
        <ImageLoader
          maxWidth={200}
          maxHeight={37}
          imgSrc={linkedInBtnSrc}
        />
      </AnchorTag>
      <ErrorBoundary>
        <Contact />
      </ErrorBoundary>
    </Root>
  )
}

export default About
