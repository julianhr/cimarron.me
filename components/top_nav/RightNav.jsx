import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import MenuItem from './MenuItem'


const Root = styled.div`
  display: flex;
  align-items: flex-end;
`

function RightNav(props) {
  const renderMenuItems = menuItems => {
    return menuItems.map(item => (
        <MenuItem
          key={item.url}
          url={item.url}
          label={item.label}
        />
    ))
  }

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
