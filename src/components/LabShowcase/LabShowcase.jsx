import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import labsData from '~/labs/labsData'
import Lab from './Lab'


const Root = styled.section`
  padding: 80px 20px 20px;
`

class LabShowcase extends React.PureComponent {
  renderLabs() {
    return labsData.map((props, i) => <Lab key={i} {...props} />)
  }

  render() {
    return (
      <Root>
        {this.renderLabs()}
      </Root>
    )
  }
}

export default LabShowcase
