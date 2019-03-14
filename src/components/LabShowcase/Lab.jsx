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
  padding: 5px 8px;
`

const Article = styled.article`
  ${baseArticle}
  padding: 10px 15px;
  width: 100%;
  height: 200px;
  align-items: center;
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

function Lab({ title, stack }) {
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
      to='#'
    >
      <Article>
        <h3>{title}</h3>
      </Article>
      <TechRoot>
        {renderTech(stack)}
      </TechRoot>
    </StyledLink>
  )
}

Lab.propTypes = {
  title: PropTypes.string,
  stack: PropTypes.arrayOf(PropTypes.string),
}

export default Lab
