import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import Lab from './Lab'


const Root = styled.section`
  padding: 80px 20px 20px;
`

function LabShowcase({ labs }) {
  const renderLabs = labs.map((lab, i) => (
    <Lab
      key={i}
      isLinkRouted={false}
      {...lab}
    />
  ))

  return (
    <Root>
      {renderLabs}
    </Root>
  )
}

LabShowcase.propTypes = {
  labs: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default LabShowcase
