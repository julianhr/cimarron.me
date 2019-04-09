import React from 'react'
import { render, mount } from 'enzyme'
import emotionSerializer from 'jest-emotion'

import ImageLoader from '../ImageLoader'
import MockApp from '~/__tests__/__mocks__/MockApp'
import imgSrc from '~/__tests__/__fixtures__/imgSrc'


const testProps = {
  maxWidth: 200,
  maxHeight: 100,
  imgSrc: imgSrc,
  styles: {
    root: {
      color: 'green'
    },
    img: {
      color: 'yellow'
    }
  },
}

const renderApp = (props) => render(<MockApp><ImageLoader {...props} /></MockApp>)


describe('ImageLoader', () => {
  describe('required props', () => {
    it('maxWidth', () => {
      const props = {...testProps}
      delete props['maxWidth']
      expect(() => renderApp(props)).toThrow()
    })
    
    it('maxHeight', () => {
      const props = {...testProps}
      delete props['maxHeight']
      expect(() => renderApp(props)).toThrow()
    })
    
    it('imgSrc', () => {
      const props = {...testProps}
      delete props['imgSrc']
      expect(() => renderApp(props)).toThrow()
    })
  })

  describe('snapshots', () => {
    beforeAll(() => {
      expect.addSnapshotSerializer(emotionSerializer)
    })

    it('matches snapshot with all props', () => {
      expect(renderApp(testProps)).toMatchSnapshot()
    })
  
    it('matches snapshot with no styles', () => {
      const props = {...testProps}
      delete props['styles']
      expect(renderApp(props)).toMatchSnapshot()
  })

    it('should trigger onload event when image src is loaded', () => {
      const oldHandle = ImageLoader.prototype.handleOnLoad
      const mockHandleOnLoad = jest.fn()
      ImageLoader.prototype.handleOnLoad = mockHandleOnLoad
  
      const wrapper = mount(<MockApp><ImageLoader {...testProps} /></MockApp>)
      wrapper.find('img').simulate('load')
      expect(mockHandleOnLoad).toBeCalledTimes(1)
      
      ImageLoader.prototype.handleOnLoad = oldHandle
      wrapper.unmount()
    })
    
    it('matches snapshot after image src is loaded', () => {
      const wrapper = mount(<MockApp><ImageLoader {...testProps} /></MockApp>)
      wrapper.find('img').simulate('load')
      expect(wrapper).toMatchSnapshot()
      wrapper.unmount()
    })
  })
})
