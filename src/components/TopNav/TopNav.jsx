import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import Logo from './Logo'
import RightNav from './RightNav'


const RootHeader = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  padding: 5px 20px 30px;
  width: 100%;
`

function TopNav({ menuItems, isLogoLinkRouted }) {
  return (
    <RootHeader>
      <Logo
        isLinkRouted={isLogoLinkRouted}
      />
      <RightNav
        menuItems={menuItems}
      />
    </RootHeader>
  )
}

TopNav.propTypes = {
  isLogoLinkRouted: PropTypes.bool,
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
}

TopNav.defaultProps = {
  isLogoLinkRouted: true,
}

export default TopNav
