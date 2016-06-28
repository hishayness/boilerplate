export default {
	path: 'sidecasters',
	getComponent(nextState, cb){
		require.ensure([], (require) => {
			cb(null, require('./components/sidecasters').default)
		})
	}
}