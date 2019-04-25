import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { connect } from 'react-redux'
import * as Sentry from '@sentry/browser'

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

  constructor() {
    super()
    this.fetchCards = this.fetchCards.bind(this)
  }

  async fetchCards() {
    const path = '/labs/infinite-scroller'
    const query = { paragraphs: 1, entries: this.props.recordsPerFetch }
    const url = urlBuilder(path, query)
    let isErrorReported = false

    try {
      const res = await fetch(url)

      if (res.ok) {
        const json = await res.json()
        return json
      } else {
        const errorMsg = await res.text()
        const error = new Error(errorMsg)
        Sentry.captureException(error)
        isErrorReported = true
        throw Error('There was an error fetching information.')
      }
    } catch (error) {
      if (!isErrorReported) {
        Sentry.captureException(error)
      }

      throw error
    }
  }

  renderChildren() {
    if (this.props.scrollerType in SCROLLERS) {
      const Element = SCROLLERS[this.props.scrollerType]
      return <Element cardFetcher={this.fetchCards} />
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
