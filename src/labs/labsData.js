import React from 'react'
import { lazyLoad } from '~/utils'


export default [
  {
    title: 'Infinite Scroller',
    component: React.lazy(() => import(/* webpackChunkName: "InfiniteScroller" */ '~/labs/001_InfiniteScroller')),
    urlPath: 'labs/infinite-scroller',
    thumbnailSrc: require('../labs/001_InfiniteScroller/thumbnail.png'),
    stack: 'React.js Javascript'.split(' '),
    createdAt: '2019-03',
  }
]