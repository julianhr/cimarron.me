import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { connect } from 'react-redux'
import { throttle } from 'lodash-es'

import { setIsFetching, setEntryCount } from '../actions/rootActions'
import Card from '../Card'
import FetchStatus from './FetchStatus'


const Root = styled.div`
  height: 100%;
  padding: 10px 10px 0;
  background: #e8e8e8;
  overflow-y: scroll;
`

export class ScrollerSentinelClientRect extends React.PureComponent {
  static propTypes = {
    cardFetcher: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    sentinelPosition: PropTypes.number.isRequired,
    setEntryCount: PropTypes.func.isRequired,
    setIsFetching: PropTypes.func.isRequired,
  }

  state = {
    cards: [],
    fetch: {
      status: 'loading',
      error: null,
    },
  }

  refRoot = React.createRef()
  refSentinel = React.createRef()

  componentDidMount() {
    this.props.setEntryCount(0)
    this.getNewCards()
  }

  handleOnScroll() {
    const { isFetching } = this.props
    const { cards } = this.state
    const { top: sentinelTop } = this.refSentinel.current.getBoundingClientRect()
    const { bottom: rootBottom } = this.refRoot.current.getBoundingClientRect()
    const isSentinelVisible = sentinelTop <= rootBottom

    if (!isFetching && isSentinelVisible && cards.length < 200) {
      this.getNewCards()
    }
  }

  async getNewCards() {
    const { cardFetcher, setIsFetching, setEntryCount } = this.props

    try {
      setIsFetching(true)
      const data = await cardFetcher(this)
      this.setNewCards(data)
      setEntryCount(this.state.cards.length)
    } catch (error) {
      this.setState({ fetch: { status: 'error', error: error.toString() } })
    }

    setIsFetching(false)
  }

  setNewCards(data) {
    const { sentinelPosition } = this.props
    const { length: lastKey } = this.state.cards
    const cards = [...this.state.cards]

    data.forEach((datum, i) => {
      const card = this.getCard(datum, i, sentinelPosition, lastKey)
      cards.push(card)
    })

    this.setState({ cards, fetch: null })
  }

  getCard(datum, i, sentinelPosition, lastKey) {
    const { title, image_url: imgUrl, description } = datum
    const position = lastKey + i + 1
    const props = { imgUrl, title, description, position }
    let CardComponent = Card

    if (i + 1 === sentinelPosition) {
      CardComponent = React.forwardRef((props, ref) => <Card forwardedRef={ref} {...props} />)
      // previous ref element will be overwritten by new sentinel
      props.forwardedRef = this.refSentinel
    }

    return <CardComponent key={lastKey + i} {...props} />
  }

  renderResult() {
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
        onScroll={throttle(this.handleOnScroll, 200, { leading: false }).bind(this)}
      >
        {this.renderResult()}
      </Root>
    )
  }
}

const mapStateToProps = ({ sentinelPosition, isFetching }) => (
  { sentinelPosition, isFetching }
)

const mapDispatchToProps = { setIsFetching, setEntryCount }

export default connect(mapStateToProps, mapDispatchToProps)(ScrollerSentinelClientRect)
