import { combineReducers } from 'redux'
import * as user from 'src/reducers/user'
import * as cart from 'src/reducers/cart'

const store = combineReducers({
	...user,
	...cart
})

export default store