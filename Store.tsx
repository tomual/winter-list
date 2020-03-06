import { createStore } from 'redux'
import { reducer } from './Redux'

const store = createStore(reducer)

export default store