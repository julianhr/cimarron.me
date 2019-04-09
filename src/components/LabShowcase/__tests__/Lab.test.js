import React from 'react'
import { render } from 'enzyme'

import Lab from '../Lab'
import imgSrc from '~/__tests__/__fixtures__/imgSrc'
import MockApp from '~/__tests__/__mocks__/MockApp'


const testProps = {
  thumbnailSrc: imgSrc,
  stack: 'React Node.js'.split(' '),
  title: 'Test Title',
  urlPath: 'https://test.com',
  isLinkRouted: false,
}

const renderApp = props => render(<MockApp><Lab {...props} /></MockApp>)

describe('Lab', () => {
  it('should match snapshot with all props', () => {
    expect(renderApp(testProps)).toMatchSnapshot()
  })

  describe('props', () => {
    it('thumbnailSrc is required', () => {
      const props = {...testProps}
      delete props.thumbnailSrc
      expect(() => renderApp(props)).toThrow()
    })

    it('stack is required', () => {
      const props = {...testProps}
      delete props.stack
      expect(() => renderApp(props)).toThrow()
    })

    it('title is required', () => {
      const props = {...testProps}
      delete props.title
      expect(() => renderApp(props)).toThrow()
    })

    it('urlPath is required', () => {
      const props = {...testProps}
      delete props.urlPath
      expect(() => renderApp(props)).toThrow()
    })

    it('isLinkRouted is required', () => {
      const props = {...testProps}
      delete props.isLinkRouted
      expect(() => renderApp(props)).toThrow()
    })
  })
})
