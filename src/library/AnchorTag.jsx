import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


function AnchorTag({ children, url, rootStyle, isLinkRouted, isTargetBlank }) {
  if (isLinkRouted) {
    return (
      <Link
        to={url}
        css={rootStyle}
      >
        {children}
      </Link>
    )
  } else {
    return (
      <a
        href={url}
        css={rootStyle}
        rel='noopener noreferrer'
        target={isTargetBlank ? '_blank' : null}
      >
        {children}
      </a>
    )
  }
}

AnchorTag.propTypes = {
  url: PropTypes.string.isRequired,
  rootStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  isLinkRouted: PropTypes.bool,
  isTargetBlank: PropTypes.bool,
}

AnchorTag.defaultProps = {
  isLinkRouted: true,
  rootStyle: {},
  isTargetBlank: false,
}

export default AnchorTag
