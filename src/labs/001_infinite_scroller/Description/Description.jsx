import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { connect } from 'react-redux'

import mdScrollerIntObs from './scroller_int_obs.md'
import mdScrollerContainerHeights from './scroller_container_height.md'
import mdScrolerSentinelClientRect from './scroller_sentinel_client_rect.md'


const Root = styled.section`
  grid-area: b1;
  padding: 0 30px 20px;
  width: 100%;

  ${props => props.theme.queries.from('md')} {
    grid-row: 2 / span 1;
    grid-column: 1 / span 1
  }
`

const P = styled.p`
  padding-top: 40px;
`

class Description extends React.PureComponent {
  static propTypes = {
    scrollerType: PropTypes.string,
  }
  
  getDescription() {
    switch (this.props.scrollerType) {
      case 'intersectionObserver':
        return mdScrollerIntObs
      case 'containerScrollHeights':
        return mdScrollerContainerHeights
      case 'sentinelClientRect':
        return mdScrolerSentinelClientRect
    }
  }

  render() {
    return (
      <Root>
        <div
          dangerouslySetInnerHTML={{ __html: this.getDescription() }}
        />
        <P>
          View on <a href="https://github.com/julianhr/lab-infinite-scroll" target='_blank' rel='noopener noreferrer'>Github</a>
        </P>
      </Root>
    )
  }
}

const mapStateToProps = ({ scrollerType }) => (
  { scrollerType }
)

export default connect(mapStateToProps)(Description)
