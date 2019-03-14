import { configureStore } from 'redux-starter-kit'
import rootReducer from './rootReducer'


const infiniteScollerStore = configureStore({
    reducer: rootReducer
})

export default infiniteScollerStore
