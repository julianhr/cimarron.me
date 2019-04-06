import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { connect } from 'react-redux'

import { urlBuilder } from '~/utils'
import ScrollerStatus from './ScrollerStatus'
import ScrollerSentinelIntObs from './ScrollerSentinelIntObs'
import ScrollerContainerHeights from './ScrollerContainerHeights'
import ScrollerSentinelClientRect from './ScrollerSentinelClientRect'


export const SCROLLERS = {
  intersectionObserver: ScrollerSentinelIntObs,
  containerScrollHeights: ScrollerContainerHeights,
  sentinelClientRect: ScrollerSentinelClientRect,
}

const Root = styled.section`
  width: 100%;
  height: 80vh;
  min-height: 400px;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  padding: 0 30px 20px;
  align-items: center;

  ${props => props.theme.queries.from('md')} {
    max-height: 800px;
  }
`

const Contour = styled.div`
  width: 100%;
  max-width: 600px;
  border: 2px solid #acacac;
  height: 100%;
  overflow: hidden;
`

export class Scrollers extends React.PureComponent {
  static propTypes = {
    recordsPerFetch: PropTypes.number.isRequired,
    scrollerType: PropTypes.string.isRequired,
  }

  async fetchCards() {
    const path = '/infinite-scroller'
    const query = { paragraphs: 1, entries: this.props.recordsPerFetch }
    const url = urlBuilder(path, query)
    const res = await fetch(url)
  
    try {
      if (res.ok) {
        const json = await res.json()
        return json
      } else {
        throw Error('There was an error with the fetch request.')
      }
    } catch (error) {
      console.error('testing error', error)
      throw error
    }
  }

  renderChildren() {
    if (this.props.scrollerType in SCROLLERS) {
      const Element = SCROLLERS[this.props.scrollerType]
      return <Element cardFetcher={this.fetchCards.bind(this)} />
    }
  }

  render() {
    return (
      <Root>
        <ScrollerStatus />
        <Contour>
          {this.renderChildren()}
        </Contour>
      </Root>
    )
  }
}


const mapStateToProps = ({ recordsPerFetch, scrollerType }) => (
  { recordsPerFetch, scrollerType }
)

export default connect(mapStateToProps)(Scrollers)
