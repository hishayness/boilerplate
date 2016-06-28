export default {
	path: 'movies',
	getComponent(nextState, cb){
		require.ensure([], (require) => {
			cb(null, require('./components/movies').default)
		});
	}
}