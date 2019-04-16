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
  transition: opacity 80ms linear;
`

class ImageLoader extends React.PureComponent {
  static propTypes = {
    imgSrc: PropTypes.string.isRequired,
    maxHeight: PropTypes.number.isRequired,
    maxWidth: PropTypes.number.isRequired,
    shouldFadeIn: PropTypes.bool,
    styles: PropTypes.object,
  }

  static defaultProps = {
    styles: {},
    shouldFadeIn: true,
  }

  constructor() {
    super()
    this.handleOnLoad = this.handleOnLoad.bind(this)
  }

  state = {
    isImgLoaded: false,
  }

  refImg = React.createRef()

  handleOnLoad() {
    this.setState({ isImgLoaded: true })
  }

  getImgProps() {
    if (this.props.shouldFadeIn) {
      let imgStyle = {
        transition: 'opacity 80ms linear',
        willChange: 'opacity',
        opacity: 0,
      }
  
      if (this.state.isImgLoaded) {
        imgStyle = {
          transition: 'opacity 80ms linear',
          opacity: 1,
          width: this.refImg.current.width,
          height: this.refImg.current.height,
        }
      }

      return {
        css: [this.props.styles.img, imgStyle],
        onLoad: this.handleOnLoad
      }
    } else {
      return { css: [this.props.styles.img] }
    }
  }

  render() {
    const { styles, maxWidth, maxHeight, imgSrc } = this.props

    return (
      <Root
        css={{ ...(styles.root || {}), width: maxWidth, height: maxHeight }}
      >
        <img
          ref={this.refImg}
          src={imgSrc}
          {...this.getImgProps()}
        />
      </Root>
    )
  }
}

export default ImageLoader
