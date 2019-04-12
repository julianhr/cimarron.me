import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import LeftNav from './LeftNav'
import RightNav from './RightNav'


const RootHeader = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  padding: 5px 20px 30px;
  width: 100%;
`

function TopNav({ menuItems }) {
  return (
    <RootHeader>
      <LeftNav />
      <RightNav
        menuItems={menuItems}
      />
    </RootHeader>
  )
}

TopNav.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TopNav
