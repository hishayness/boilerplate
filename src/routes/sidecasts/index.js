export default {
	path: 'sidecasts',
	getComponent(nextState, cb){
		require.ensure([], (require) => {
			cb(null, require('./components/sidecasts').default)
		})
	}
}