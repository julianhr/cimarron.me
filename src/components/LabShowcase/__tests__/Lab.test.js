import React from 'react'
import { render } from 'enzyme'

import Lab from '../Lab'
import imgSrc from '~/__tests__/__fixtures__/imgSrc'
import withAppRoot from '~/components/library/withAppRoot'


const testProps = {
  thumbnailSrc: imgSrc,
  stack: 'React Node.js'.split(' '),
  title: 'Test Title',
  urlPath: 'https://test.com',
}

describe('Lab', () => {
  it('should match snapshot with all props', () => {
    const RootedLab = withAppRoot(Lab, testProps)
    const wrapper = render(<RootedLab />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('required props', () => {
    it('thumbnailSrc', () => {
      const props = {...testProps}
      delete props.thumbnailSrc
      const RootedLab = withAppRoot(Lab, props)
      expect(() => render(<RootedLab />)).toThrow()
    })

    it('stack', () => {
      const props = {...testProps}
      delete props.stack
      const RootedLab = withAppRoot(Lab, props)
      expect(() => render(<RootedLab />)).toThrow()
    })

    it('title', () => {
      const props = {...testProps}
      delete props.title
      const RootedLab = withAppRoot(Lab, props)
      expect(() => render(<RootedLab />)).toThrow()
    })

    it('urlPath', () => {
      const props = {...testProps}
      delete props.urlPath
      const RootedLab = withAppRoot(Lab, props)
      expect(() => render(<RootedLab />)).toThrow()
    })
  })


})
