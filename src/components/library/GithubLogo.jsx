import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import githubLogoPng from '~/assets/img/github_logo.png'


const Img = styled.img`
  width: 60px;
`

function GithubLogo({ url, styles }) {
  return (
    <span
      css={styles.span}
    >
      <a
        href={url} 
        target='_blank'
        rel='noopener noreferrer'
        css={styles.a}
      >
        <Img
          src={githubLogoPng}
          alt='GitHub'
          css={styles.img}
        />
      </a>
    </span>
  )
}

GithubLogo.propTypes = {
  url: PropTypes.string,
  styles: PropTypes.object,
}

GithubLogo.defaultProps = {
  styles: {}
}

export default GithubLogo