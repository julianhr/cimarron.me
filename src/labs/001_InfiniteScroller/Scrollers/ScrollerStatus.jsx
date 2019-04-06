import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { connect } from 'react-redux'

import { colors } from '~/styles/theme'

const ANIMATION_BUFFER = 30

const Root = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 30px 10px;
`

const Span = styled.span`
  padding: 2px 10px;
`

export class ScrollerStatus extends React.PureComponent {
  static propTypes = {
    entryCount: PropTypes.number,
  }

  static defaultProps = {
    entryCount: 0,
  }

  state = {
    flashState: 'reset',
    fetchCount: 0,
  }

  componentDidUpdate(prevProps, prevState) {
    // reset state when a new scroller method is selected
    if (this.props.entryCount === 0 && this.state.fetchCount > 0) {
      this.setState({ fetchCount: 0, flashState: 'reset' })
    // animate if count has increased
    } else if (prevProps.entryCount < this.props.entryCount) {
      this.setState({ fetchCount: this.state.fetchCount + 1 },
        () => this.canAnimate() && this.animateFlash()
      )
    }
  }

  canAnimate() {
    // don't animate on initial fetch, only when the user
    //  triggers one by scrolling
    return this.state.fetchCount >= 2
  }

  animateFlash() {
    this.setState({ flashState: 'stage' })
    setTimeout(() => { this.setState({ flashState: 'transition' }) }, ANIMATION_BUFFER)
  }

  getSpanStyle() {
    const transDurationMs = 65

    switch (this.state.flashState) {
      case 'reset':
        return {}
      case 'stage':
        return {
          backgroundColor: colors.highlight,
          willChange: 'background-color',
        }
      case 'transition':
        return {
          transition: `background-color ${transDurationMs}ms`,
          backgroundColor: 'transparent',
        }
    }
  }

  renderStatus() {
    const { entryCount } = this.props

    if (entryCount > 0) {
      return (
        <div>
          Records: 
          <Span
            css={this.getSpanStyle()} 
          >
            {entryCount}
          </Span>
        </div>
      )
    }
  }

  render() {
    return (
      <Root>
        {this.renderStatus()}
      </Root>
    )
  }

}

const mapStateToProps = ({ entryCount }) => ({ entryCount })

export default connect(mapStateToProps)(ScrollerStatus)
