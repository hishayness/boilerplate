import createReducer from 'src/utils/reducer-creator'

const initialState = {
	cartVariants: []
}

const ActionTypes = {
	ADD_CART_ITEM: 'ADD_CART_ITEM'
}

export const user = createReducer(initialState, {
	[ActionTypes.ADD_CART_ITEM](state, action){
		return [ ...state, action.cartItem ]
	}
})