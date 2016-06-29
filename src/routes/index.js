import React from 'react'
import { render } from 'react-dom'
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';

const rootRoute = {
	component: 'div',
	path: '/',
//	getComponent(nextState, cb) {
//		require.ensure([], (require) => {
//			cb(null, require('./app').default)
//		})
//	},
	component: require('framework/app').default,
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./home').default)
		})
	},
//	childRoutes: [
//		//require('./movies')
//		require('./movies').default
//	],
	getChildRoutes(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				require('./sidecasters').default,
				require('./sidecasts').default,
				require('./movies').default
			])
		})
	}
}

render(<Router history={browserHistory} routes={rootRoute} />
, document.getElementById('app'))
