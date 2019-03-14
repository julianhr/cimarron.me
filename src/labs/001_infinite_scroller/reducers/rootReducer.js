import { createReducer } from 'redux-starter-kit'


const INITIAL_STATE = {
    // static
    recordsPerFetch: 8,
    sentinelPosition: 6,
    // editable
    entryCount: 0,
    isFetching: false,
    scrollerType: 'intersectionObserver',
}

export default createReducer(INITIAL_STATE, {
    'SET_SCROLLER_TYPE': (state, { payload }) => {
        return { ...state, scrollerType: payload }
    },
    'SET_ENTRY_COUNT': (state, { payload }) => {
        return { ...state, entryCount: payload }
    },
    'SET_IS_FETCHING': (state, { payload }) => {
        return { ...state, isFetching: payload }
    },
})
