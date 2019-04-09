import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import ImageLoader from '../library/ImageLoader'
import AnchorTag from '../library/AnchorTag'


const baseArticle = css`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`

const STYLES = {
  link: css`
    ${baseArticle}
    max-width: 250px;
    text-decoration: none;
    color: unset;
    background: #ededed;
    padding: 5px 12px 12px;
    will-change: box-shadow;
    transition: box-shadow 30ms ease-in;

    :hover {
      box-shadow: 1px 1px 4px #bbb;
    }
  `
}

const Article = styled.article`
  ${baseArticle}
  padding: 10px 15px;
  width: 100%;
  height: 220px;
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

function Lab({ title, stack, urlPath, thumbnailSrc, isLinkRouted }) {
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
    <AnchorTag
      url={urlPath}
      rootStyle={STYLES.link}
      isLinkRouted={isLinkRouted}
    >
      <Article>
        <ImageLoader
          imgSrc={thumbnailSrc}
          maxWidth={200}
          maxHeight={120}
          styles={{ root: { marginBottom: 20 } }}
        />
        <h3>{title}</h3>
      </Article>
      <TechRoot>
        {renderTech(stack)}
      </TechRoot>
    </AnchorTag>
  )
}

Lab.propTypes = {
  thumbnailSrc: PropTypes.string.isRequired,
  stack: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  urlPath: PropTypes.string.isRequired,
  isLinkRouted: PropTypes.bool.isRequired,
}

export default Lab
