import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { connect } from 'react-redux'

import mdScrollerIntObs from './scroller_int_obs.md'
import mdScrollerContainerHeights from './scroller_container_height.md'
import mdScrolerSentinelClientRect from './scroller_sentinel_client_rect.md'
import GithubLogo from '~/components/library/GithubLogo'


const Root = styled.section`
  padding: 0 30px 20px;
  width: 100%;

  ${props => props.theme.queries.from('md')} {
    padding: 40px 30px 20px;
  }
`

const P = styled.p`
  padding-top: 20px;
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
    const githubUrl = "https://github.com/julianhr/cimarron-me/tree/master/src/labs/001_infinite_scroller"

    return (
      <Root>
        <div
          dangerouslySetInnerHTML={{ __html: this.getDescription() }}
        />
        <P>
          source on <GithubLogo url={githubUrl} styles={{ img: { marginTop: -4 } }} />
        </P>
      </Root>
    )
  }
}

const mapStateToProps = ({ scrollerType }) => (
  { scrollerType }
)

export default connect(mapStateToProps)(Description)
