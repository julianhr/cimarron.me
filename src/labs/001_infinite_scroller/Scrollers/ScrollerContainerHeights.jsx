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

class ScrollerContainerHeights extends React.PureComponent {
  static propTypes = {
    cardFetcher: PropTypes.func,
    isFetching: PropTypes.bool,
    setEntryCount: PropTypes.func,
    setIsFetching: PropTypes.func,
  }

  state = {
    cards: []
  }

  componentDidMount() {
    this.fetchCards()
  }

  handleOnScroll = (event) => {
    const { isFetching } = this.props
    const { cards } = this.state

    if (!isFetching && this.canFetchCards(event.target) && cards.length < 200) {
      this.fetchCards()
    }
  }
  
  canFetchCards(containerElement) {
    const { scrollHeight, scrollTop, clientHeight } = containerElement
    const buffer = 500
    return scrollHeight - scrollTop < clientHeight + buffer
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
    data.forEach(({ title, image_url: imgUrl, description }, i) => {
      const position = lastKey + i + 1
      const props = { imgUrl, title, description, position }
      cards.push(<Card key={lastKey+i} {...props} /> )
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
        onScroll={this.handleOnScroll}
      >
        {this.renderCardResult()}
      </Root>
    )
  }
}

const mapStateToProps = ({ isFetching }) => ({ isFetching })
const mapDispatchToProps = { setIsFetching, setEntryCount }

export default connect(mapStateToProps, mapDispatchToProps)(ScrollerContainerHeights)
