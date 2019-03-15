import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'


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

const Img = styled.img`
  float: left;
  width: 180px;
  height: 100px;
  padding-right: 30px;
  padding-bottom: 4px;

  ${props => props.theme.queries.upTo('xs')} {
    display: none;
  }
`

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
      <Img src={imgUrl} />
      <H4>{`${position}. ${title}`}</H4>
      {pElDescription}
    </Root>
  )
}

Card.propTypes = {
  description: PropTypes.array.isRequired,
  forwardedRef: PropTypes.object,
  imgUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  position: PropTypes.number,
}

export default Card
