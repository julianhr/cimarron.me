import { createAction } from 'redux-starter-kit'


export const setTestAction = createAction('TEST_REDUCER')

export function setDispatchAction(key) {
  return (dispatch, getState) => {
    dispatch({})
  }
}
