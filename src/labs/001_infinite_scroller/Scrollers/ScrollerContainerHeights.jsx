import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { connect } from 'react-redux'

import Card from '../Card'
import { setEntryCount, setIsFetching } from '../actions/rootActions'


const Root = styled.div`
  height: 80vh;
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
      this.props.setIsFetching(true)
      this.fetchCards()
    }
  }
  
  canFetchCards(containerElement) {
    const { scrollHeight, scrollTop, clientHeight } = containerElement
    const buffer = 500
    return scrollHeight - scrollTop < clientHeight + buffer
  }

  fetchCards() {
    this.props.cardFetcher()
      .then(data => {
        const { cards: currCards } = this.state
        const cards = [...currCards]

        this.appendNewCards(cards, data, currCards.length)
        this.setState({ cards })
        this.props.setEntryCount(cards.length)
        this.props.setIsFetching(false)
      })
      .catch(error => {
        this.props.setIsFetching(false)
        console.error('Fetch error:', error)
      })
  }

  appendNewCards(cards, data, lastKey) {
    data.forEach(({ title, image_url: imgUrl, description }, i) => {
      const position = lastKey + i + 1
      const props = { imgUrl, title, description, position }
      cards.push(<Card key={lastKey+i} {...props} /> )
    })
  }

  render() {
    return (
      <Root
        onScroll={this.handleOnScroll}
      >
        {this.state.cards}
      </Root>
    )
  }
}

const mapStateToProps = ({ isFetching }) => ({ isFetching })
const mapDispatchToProps = { setEntryCount, setIsFetching }

export default connect(mapStateToProps, mapDispatchToProps)(ScrollerContainerHeights)
