import React from 'react'
import styled from '@emotion/styled'

import LeftNav from './LeftNav'
import RightNav from './RightNav'


const RootHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 5px 20px 30px;
  width: 100%;
`

const menuItems = [
  { url: '/', label: 'Home' },
]

class AppNav extends React.PureComponent {
  render() {
    return (
      <RootHeader>
        <LeftNav />
        <RightNav
          menuItems={menuItems}
        />
      </RootHeader>
    )
  }
}

export default AppNav
