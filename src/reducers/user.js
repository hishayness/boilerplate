import createReducer from 'src/utils/reducer-creator'

const initialState = {
	newsfeedRead: false
}

const ActionTypes = {
	READ_NEWSFEED: 'READ_NEWSFEED'
}

export const user = createReducer(initialState, {
	[ActionTypes.READ_NEWSFEED](state, action){
		return {
			newsfeedRead: true
		}
	}
})