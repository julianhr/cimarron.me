import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { connect } from 'react-redux'

import { colors } from '../../../styles/theme'


const Root = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 30px 10px;
`

const Span = styled.span`
  padding: 2px 10px;
`

class ScrollerStatus extends React.PureComponent {
  static propTypes = {
    entryCount: PropTypes.number,
    isFetching: PropTypes.bool,
  }

  state = {
    spanStyle: {},
    fetchCount: 0,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.entryCount < this.props.entryCount) {
      this.setState({ fetchCount: this.state.fetchCount + 1 },
        () => { this.countFlash() }
      )
    }
  }

  countFlash() {
    if (this.state.fetchCount <= 1) { return }

    const buffer = 30

    this.setState({ spanStyle: {
      backgroundColor: colors.heightlight,
      willChange: 'background-color',
    }})

    setTimeout(() => { this.setState({ spanStyle: {
      transition: 'background-color 240ms',
      backgroundColor: 'transparent',
    }}) }, buffer)
  }

  renderStatus() {
    const { entryCount, isFetching } = this.props

    if (entryCount === 0 && isFetching) {
      return 'Loading...'
    } else if (entryCount > 0) {
      return (
        <div>
          Records: 
          <Span
            css={this.state.spanStyle}
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

const mapStateToProps = ({ entryCount, isFetching }) => ({ entryCount, isFetching })

export default connect(mapStateToProps)(ScrollerStatus)
