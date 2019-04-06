import React from 'react'


export const LAB_SHAPE = {
  title: ['string'],
  component: ['object'],
  urlPath: ['string'],
  thumbnailSrc: ['string'],
  stack: ['object'],
  createdAt: ['string']
}

const DATA = [
  {
    title: 'Infinite Scroller',
    component: React.lazy(
      () => import(/* webpackChunkName: "InfiniteScroller" */ '~/labs/001_InfiniteScroller/InfiniteScroller')
    ),
    urlPath: '/labs/infinite-scroller',
    thumbnailSrc: require('../labs/001_InfiniteScroller/thumbnail.png'),
    stack: 'React.js Javascript'.split(' '),
    createdAt: '2019-03',
  }
]

export default DATA
