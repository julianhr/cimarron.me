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
  },
  {
    title: 'Spreadsheet App',
    urlPath: 'https://julianhr.github.io/app-spreadsheet',
    thumbnailSrc: require('../apps/001_Spreadsheet/thumbnail.png'),
    stack: 'React xstate'.split(' '),
    createdAt: '2019-07',
  },
]

export default DATA
