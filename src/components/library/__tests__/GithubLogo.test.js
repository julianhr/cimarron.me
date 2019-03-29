import React from 'react'
import { mount } from 'enzyme'

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

beforeAll(() => {
  throwPropErrors()
})

describe('GithubLogo', () => {
  it('matches snapshot with all props', () => {
    const wrapper = mount(<GithubLogo {...testProps} />)
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })
  
  it('matches snapshot without styles prop', () => {
    const wrapper = mount(<GithubLogo url={testProps.url} />)
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })
  
  it('requires url', () => {
    const props = {...testProps}
    delete props['url']
    expect(() => <GithubLogo {...props} />).toThrow()
  })
})
