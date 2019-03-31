import React from 'react'
import { mount } from 'enzyme'
import emotionSerializer from 'jest-emotion'

import GithubLogo from '../GithubLogo'
import throwPropErrors from '~/__tests__/__mocks__/throwPropErrorsMock'


const testProps = {
  url: 'http://test.com',
  styles: { 
    span: {
      color: 'orange'
    },
    a: {
      color: 'red'
    },
    img: {
      color: 'green'
    },
  },
}

describe('GithubLogo', () => {
  describe('required props', () => {
    beforeAll(() => {
      throwPropErrors()
    })

    it('url', () => {
      const props = {...testProps}
      delete props['url']
      expect(() => <GithubLogo {...props} />).toThrow()
    })
  })

  describe('snapshots', () => {
    beforeAll(() => {
      expect.addSnapshotSerializer(emotionSerializer)
    })

    it('with all props', () => {
      const wrapper = mount(<GithubLogo {...testProps} />)
      expect(wrapper).toMatchSnapshot()
      wrapper.unmount()
    })
    
    it('without styles prop', () => {
      const wrapper = mount(<GithubLogo url={testProps.url} />)
      expect(wrapper).toMatchSnapshot()
      wrapper.unmount()
    })
  })
})
