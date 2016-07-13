import React from 'react'
import { render } from 'react-dom'
import { match, Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import store from 'src/store'
import routes from 'src/pages/routes'
import Stylizer from 'src/utils/stylizer'

match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
	render(<Provider store={store}>
		<Stylizer insertCss={styles => styles._insertCss()}>
			<Router {...renderProps} />
		</Stylizer>
	</Provider>, document.getElementById('app'));
});