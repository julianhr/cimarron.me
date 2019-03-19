import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Link } from 'react-router-dom'


const baseArticle = css`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`

const StyledLink = styled(Link)`
  ${baseArticle}
  max-width: 250px;
  text-decoration: none;
  color: unset;
  background: #ededed;
  padding: 5px 12px 12px;
  will-change: box-shadow;
  transition: box-shadow 30ms ease-in;

  :hover {
    box-shadow: 1px 1px 6px #bbb;
  }
`

const Article = styled.article`
  ${baseArticle}
  padding: 10px 15px;
  width: 100%;
  height: 220px;
  align-items: center;
`

const Img = styled.img`
  padding-bottom: 20px;
`

const TechRoot = styled.section`
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
`

const Tech = styled.div`
  margin: 2px;
  padding: 2px 7px;
`

function Lab({ title, stack, urlPath, thumbnailSrc }) {
  const getTechStyle = (index) => {
    const hue = (330 + index * 30) % 360
    const sat = 60
    const lum = 85
    return { background: `hsl(${hue}, ${sat}%, ${lum}%)` }
  }

  const renderTech = stack => (
    stack.map((tech, i) => (
      <Tech
        key={i}
        css={getTechStyle(i)}
      >
        {tech}
      </Tech>
    ))
  )

  return (
    <StyledLink
      to={urlPath}
    >
      <Article>
        <Img
          src={thumbnailSrc}
        />
        <h3>{title}</h3>
      </Article>
      <TechRoot>
        {renderTech(stack)}
      </TechRoot>
    </StyledLink>
  )
}

Lab.propTypes = {
  thumbnailSrc: PropTypes.string,
  stack: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  urlPath: PropTypes.string,
}

export default Lab
