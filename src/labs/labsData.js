import React from 'react'


const data = [
  {
    title: 'Infinite Scroller',
    component: React.lazy(
      () => import(/* webpackChunkName: "InfiniteScroller" */ '~/labs/001_InfiniteScroller')
    ),
    urlPath: '/labs/infinite-scroller',
    thumbnailSrc: require('../labs/001_InfiniteScroller/thumbnail.png'),
    stack: 'React.js Javascript'.split(' '),
    createdAt: '2019-03',
  }
]

export default data
