import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { connect } from 'react-redux'

import { setIsFetching, setEntryCount } from '../actions/rootActions'
import Card from '../Card'
import FetchStatus from './FetchStatus'


const Root = styled.div`
  height: 100%;
  padding: 10px 10px 0;
  background: #e8e8e8;
  overflow-y: scroll;
`

class ScrollerSentinelClientRect extends React.PureComponent {
  static propTypes = {
    cardFetcher: PropTypes.func,
    isFetching: PropTypes.bool,
    sentinelPosition: PropTypes.number,
    setEntryCount: PropTypes.func,
    setIsFetching: PropTypes.func,
  }

  state = {
    cards: []
  }

  refRoot = React.createRef()
  refSentinel = React.createRef()

  componentDidMount() {
    this.props.setEntryCount(0)
    this.fetchCards()
  }

  handleOnScroll = (event) => {
    const { isFetching } = this.props
    const { cards } = this.state
    const { top: sentinelTop } = this.refSentinel.current.getBoundingClientRect()
    const { clientHeight: rootClientHeight } = this.refRoot.current
    const isSentinelVisible = sentinelTop <= rootClientHeight

    if (!isFetching && isSentinelVisible && cards.length < 200) {
      this.fetchCards()
    }
  }

  async fetchCards() {
    const { cardFetcher, setIsFetching } = this.props
    let data
    setIsFetching(true)

    try {
      data = await cardFetcher(this)
      if (!data) { return }
    } catch (error) {
      this.setState({ fetch: { status: 'error', error: error.toString() } })
      return
    }

    const { cards: currCards } = this.state
    const cards = [...currCards]

    this.appendNewCards(cards, data, currCards.length)
    this.props.setEntryCount(cards.length)
    this.setState({ cards, fetch: null })
    setIsFetching(false)
  }

  appendNewCards(cards, data, lastKey) {
    const { sentinelPosition } = this.props

    data.forEach(({ title, image_url: imgUrl, description }, i) => {
      const position = lastKey + i + 1
      const props = { imgUrl, title, description, position }
      let CardComponent = Card

      if (i+1 === sentinelPosition) {
        CardComponent = React.forwardRef((props, ref) => <Card forwardedRef={ref} {...props} />)
        props.forwardedRef = this.refSentinel
      }

      cards.push( <CardComponent key={lastKey+i} {...props} /> )
    })
  }

  renderCardResult() {
    const fetchStatus = (this.state.fetch || {}).status

    if (fetchStatus === 'loading') {
      return <FetchStatus>Loading...</FetchStatus>
    } else if (fetchStatus === 'error') {
      return <FetchStatus>{this.state.fetch.error.toString()}</FetchStatus>
    } else {
      return this.state.cards
    }
  }

  render() {
    return (
      <Root
        ref={this.refRoot}
        onScroll={this.handleOnScroll}
      >
        {this.renderCardResult()}
      </Root>
    )
  }
}

const mapStateToProps = ({ sentinelPosition, isFetching }) => (
  { sentinelPosition, isFetching }
)

const mapDispatchToProps = { setIsFetching, setEntryCount }

export default connect(mapStateToProps, mapDispatchToProps)(ScrollerSentinelClientRect)
