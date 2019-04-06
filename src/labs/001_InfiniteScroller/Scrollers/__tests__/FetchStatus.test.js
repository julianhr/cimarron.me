import React from 'react'
import { render, shallow } from 'enzyme'
import { create } from 'react-test-renderer'

import FetchStatus from '../FetchStatus'


describe('FetchStatus', () => {
  describe('props', () => {
    it('requires children', () => {
      expect(() => render(<FetchStatus />)).toThrow()
    })
  })

  it('matches snapshot with all props', () => {
    const text = 'Testing'
    const wrapper = render(<FetchStatus>{text}</FetchStatus>)
    expect(wrapper).toMatchSnapshot()
  })


  it('accepts string as child', () => {
    const text = 'Testing'
    const wrapper = render(<FetchStatus>{text}</FetchStatus>)
    expect(wrapper.text()).toEqual(text)
  })

  it('accepts element as child', () => {
    const TestElement = () => <article>testing</article>
    const wrapper = create(
      <FetchStatus>
        <TestElement className={'test-class'} />
      </FetchStatus>
    )

    expect(wrapper.root.findAllByType(TestElement)).toHaveLength(1)
    expect(wrapper).toMatchSnapshot()
  })
})
