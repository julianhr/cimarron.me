import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import ImageLoader from '~/components/library/ImageLoader'


const Root = styled.article`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 20px 25px 10px;
  min-height: 140px;
`

const H4 = styled.h4`
  color: ${props => props.theme.colors.text};
  padding-bottom: 10px;
`

const P = styled.p`
  padding-top: 5px;
`

const imgStyle = {
  display: 'none',
  '@media (min-width: 520px)': {
    display: 'inherit',
    float: 'left',
    width: 150,
    height: 100,
    marginRight: 30,
    marginBottom: 10,
  }
}

function Card({ title, imgUrl, description, forwardedRef, position }) {
  const pElDescription = description.map((desc, i) =>
    <P key={i}>{desc}</P>
  )

  return (
    <Root
      ref={forwardedRef}
      css={{
        background: forwardedRef ? '#f0d5ea' : 'white',
        border: forwardedRef ? '1px solid #a07f99' : null,
      }}
    >
      <ImageLoader
        maxWidth={150}
        maxHeight={100}
        imgSrc={imgUrl}
        styles={{ root: imgStyle }}
      />
      <H4>{`${position}. ${title}`}</H4>
      {pElDescription}
    </Root>
  )
}

Card.propTypes = {
  description: PropTypes.array.isRequired,
  forwardedRef: PropTypes.object,
  imgUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
}

export default Card
