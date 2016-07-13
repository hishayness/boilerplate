import { createStore } from 'redux'
import reducers from 'src/utils/root-reducer'
//import cart from 'src/reducers/cart'

//let store = createStore(reducers, window.STATE_FROM_SERVER)
//let store = createStore(cart)
let store = createStore(reducers)

export default store
