import TestComp1 from '~/__tests__/__fixtures__/TestComp1'
import TestComp2 from '~/__tests__/__fixtures__/TestComp2'

const testLabs = [
  {
    title: 'Title 1',
    component: TestComp1,
    urlPath: '/path/1',
    thumbnailSrc: 'http://image1.com',
    stack: 'React Python'.split(' '),
    createdAt: '2019-03',
  },
  {
    component: TestComp2,
    title: 'Title 2',
    urlPath: '/path/2',
    thumbnailSrc: 'http://image2.com',
    stack: 'Ruby Go'.split(' '),
    createdAt: '2019-04',
  },
]

export default testLabs
