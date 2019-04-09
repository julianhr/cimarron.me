import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


function AnchorTag({ children, url, rootStyle, isLinkRouted }) {
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
}

AnchorTag.defaultTypes = {
  isLinkRouted: true,
  rootStyle: {},
}

export default AnchorTag
