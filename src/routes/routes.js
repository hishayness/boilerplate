module.exports = ({
	path: '/',
	component: require('framework/app').default,
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./home').default)
		})
	},
	getChildRoutes(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				require('./sidecasters').default,
				require('./sidecasts').default,
				require('./movies').default
			])
		})
	}
})