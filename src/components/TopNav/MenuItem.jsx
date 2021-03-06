import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import AnchorTag from '~/library/AnchorTag'


const Root = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`

const STYLES = {
  link: (props) => css`
    color: ${props.colors.text};
    text-decoration: none;
    margin: 0 8px;
    padding: 0 4px 3px;
    border-bottom: 2px solid transparent;
    transition: border-bottom-color 75ms linear;

    :hover {
      border-bottom-color: ${props.colors.primary.light};
      transition-duration: 140ms;
    }
  `
}

function MenuItem({ url, label, isLinkRouted }) {
  return (
    <Root>
      <AnchorTag
        url={url}
        rootStyle={STYLES.link}
        isLinkRouted={isLinkRouted}
      >
        {label}
      </AnchorTag>
    </Root>
  )
}

MenuItem.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isLinkRouted: PropTypes.bool,
}

MenuItem.defaultProps = {
  isLinkRouted: true,
}

export default MenuItem
