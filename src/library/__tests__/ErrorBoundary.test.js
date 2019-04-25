import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'
import * as Sentry from '@sentry/browser'

import ErrorBoundary from '../ErrorBoundary'


describe('ErrorBoundary', () => {
  it('stops propagation of error', () => {
    const ThrowComponent = () => { throw new Error('test error') }
    jest.spyOn(Sentry, 'captureException').mockReturnValue(null)

    expect(() => create(
      <ErrorBoundary>
        <ThrowComponent />
      </ErrorBoundary>
    )).not.toThrow()
  })

  it('catches bubbled error and reports it', () => {
    const errorMsg = 'test error message'
    const ThrowComponent = () => { throw new Error(errorMsg) }
    const spy = jest.spyOn(Sentry, 'captureException').mockReturnValue(null)
    const wrapper = create(<ErrorBoundary><ThrowComponent /></ErrorBoundary>)

    expect(wrapper.root.instance.state.error.message).toEqual(errorMsg)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
