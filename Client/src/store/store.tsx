import { configureStore } from '@reduxjs/toolkit'
import reducers from './Reducer'
const store = configureStore({
    reducer: reducers
})
export default store
