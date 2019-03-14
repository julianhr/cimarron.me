import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import labs from '~/labs/labs_info.js'
import Lab from './Lab'


const Root = styled.section`
`

class LabShowcase extends React.PureComponent {
  renderLabs() {
    return labs.map((props, i) => <Lab key={i} {...props} />)
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
