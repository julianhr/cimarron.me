import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import MenuItem from './MenuItem'


const Root = styled.div`
  display: flex;
  align-items: flex-end;
`

function RightNav(props) {

  const renderMenuItems = menuItems => (
    menuItems.map(({ url, label, isLinkRouted }, i) => (
      <MenuItem
        key={i}
        url={url}
        label={label}
        isLinkRouted={isLinkRouted}
      />
    ))
  )

  return (
    <Root>
      {renderMenuItems(props.menuItems)}
    </Root>
  )
}

RightNav.propTypes = {
  menuItems: PropTypes.array,
}

export default RightNav
