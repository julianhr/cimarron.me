import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'


const Root = styled.figure`
  display: flex;
  align-items: center;
  background: ${props => props.theme.colors.background};
`

const Img = styled.img`
  opacity: 0;
  transition: opacity 100ms linear;
`

class ImageLoader extends React.PureComponent {
  static propTypes = {
    maxWidth: PropTypes.number.isRequired,
    maxHeight: PropTypes.number.isRequired,
    imgSrc: PropTypes.string.isRequired,
    styles: PropTypes.object,
  }

  static defaultProps = {
    styles: {},
  }

  state = {
    isImgLoaded: false,
  }

  refImg = React.createRef()

  handleOnLoad = () => {
    this.setState({ isImgLoaded: true })
  }

  render() {
    const { styles, maxWidth, maxHeight, imgSrc } = this.props
    let imgStyle = { willChange: 'opacity' }

    if (this.state.isImgLoaded) {
      imgStyle = {
        opacity: 1,
        width: this.refImg.current.width,
        height: this.refImg.current.height,
      }
    }

    return (
      <Root
        css={{ ...(styles.root || {}), width: maxWidth, height: maxHeight }}
      >
        <Img
          ref={this.refImg}
          src={imgSrc}
          css={{ ...(styles.img || {}), ...imgStyle }}
          onLoad={this.handleOnLoad}
        />
      </Root>
    )
  }
}

export default ImageLoader
