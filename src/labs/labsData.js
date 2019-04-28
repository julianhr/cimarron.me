import React from 'react'


export const LAB_SHAPE = {
  title: ['string'],
  urlPath: ['string'],
  thumbnailSrc: ['string'],
  stack: ['object'],
  createdAt: ['string']
}

const DATA = [
  {
    title: 'Infinite Scroller',
    urlPath: '/labs/infinite-scroller',
    thumbnailSrc: require('../labs/001_InfiniteScroller/thumbnail.png'),
    stack: 'React Flask AWS'.split(' '),
    createdAt: '2019-03',
  }
]

export default DATA
