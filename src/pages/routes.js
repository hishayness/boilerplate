export default {
	path: '/',
	component: require('framework/app'),
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./home'))
		})
	},
	getChildRoutes(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				require('./about'),
			])
		})
	}
}