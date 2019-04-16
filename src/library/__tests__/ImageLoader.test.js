import React from 'react'
import { render, mount } from 'enzyme'
import { create } from 'react-test-renderer'
import emotionSerializer from 'jest-emotion'

import ImageLoader from '../ImageLoader'
import MockApp from '~/__tests__/__mocks__/MockApp'
import imgSrc from '~/__tests__/__fixtures__/imgSrc'


const testProps = {
  maxWidth: 200,
  maxHeight: 100,
  imgSrc: imgSrc,
  shouldFadeIn: false,
  styles: {
    root: {
      color: 'green'
    },
    img: {
      color: 'yellow'
    }
  },
}

const renderApp = (props) => create(<MockApp><ImageLoader {...props} /></MockApp>)


describe('ImageLoader', () => {
  describe('props', () => {
    test('maxWidth is required', () => {
      const props = {...testProps}
      delete props.maxWidth
      expect(() => renderApp(props)).toThrow()
    })

    test('maxHeight is required', () => {
      const props = {...testProps}
      delete props.maxHeight
      expect(() => renderApp(props)).toThrow()
    })

    test('imgSrc is required', () => {
      const props = {...testProps}
      delete props.imgSrc
      expect(() => renderApp(props)).toThrow()
    })

    test('shouldFadeIn is not required', () => {
      const props = {...testProps}
      delete props.shouldFadeIn
      expect(() => renderApp(props)).not.toThrow()
    })

    test('styles is not required', () => {
      const props = {...testProps}
      delete props.styles
      expect(() => renderApp(props)).not.toThrow()
    })
  })

  describe('image fade in', () => {
    beforeAll(() => {
      expect.addSnapshotSerializer(emotionSerializer)
    })

    test('enabled', () => {
      const props = {...testProps}
      props.shouldFadeIn = true
      expect(renderApp(props)).toMatchSnapshot()
    })
  
    test('disabled', () => {
      const props = {...testProps}
      props.shouldFadeIn = false
      expect(renderApp(props)).toMatchSnapshot()
    })
  })

  describe('on image load', () => {
    let propsFadeIn

    beforeEach(() => {
      propsFadeIn = {...testProps}
      propsFadeIn.shouldFadeIn = true
    })

    it('should trigger onload function once loaded', () => {
      const oldHandle = ImageLoader.prototype.handleOnLoad
      const mockHandleOnLoad = jest.fn()
      ImageLoader.prototype.handleOnLoad = mockHandleOnLoad
  
      const wrapper = mount(<MockApp><ImageLoader {...propsFadeIn} /></MockApp>)
      wrapper.find('img').simulate('load')
      expect(mockHandleOnLoad).toBeCalledTimes(1)
      
      ImageLoader.prototype.handleOnLoad = oldHandle
      wrapper.unmount()
    })
    
    it('matches snapshot after image is loaded', () => {
      const wrapper = mount(<MockApp><ImageLoader {...propsFadeIn} /></MockApp>)

      wrapper.find('img').simulate('load')
      expect(wrapper).toMatchSnapshot()
      wrapper.unmount()
    })
  })
})
