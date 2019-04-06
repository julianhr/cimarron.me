import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { connect } from 'react-redux'

import mdScrollerIntObs from './scroller_int_obs.md'
import mdScrollerContainerHeights from './scroller_container_height.md'
import mdScrolerSentinelClientRect from './scroller_sentinel_client_rect.md'
import GithubLogo from '~/components/library/GithubLogo'


export const SCROLLERS = {
  'intersectionObserver': mdScrollerIntObs,
  'containerScrollHeights': mdScrollerContainerHeights,
  'sentinelClientRect': mdScrolerSentinelClientRect,
}

const GITHUB_URL = "https://github.com/julianhr/cimarron.me/tree/master/src/labs/001_InfiniteScroller"

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

export class Description extends React.PureComponent {
  static propTypes = {
    scrollerType: PropTypes.string,
  }
  
  getDescription() {
    if (this.props.scrollerType in SCROLLERS) {
      return SCROLLERS[this.props.scrollerType]
    } else {
      return <React.Fragment />
    }
  }

  render() {
    return (
      <Root>
        <div
          dangerouslySetInnerHTML={{ __html: this.getDescription() }}
        />
        <P>
          source on <GithubLogo url={GITHUB_URL} styles={{ img: { marginTop: -4 } }} />
        </P>
      </Root>
    )
  }
}

const mapStateToProps = ({ scrollerType }) => (
  { scrollerType }
)

export default connect(mapStateToProps)(Description)
