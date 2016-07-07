import React from 'react'
import { render } from 'react-dom'
import { match, Router, browserHistory } from 'react-router'
import routes from 'src/routes/routes'
import Provider from 'src/provider'

match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
	render(<Provider insertCss={styles => styles._insertCss()}>
		<Router {...renderProps} />
	</Provider>, document.getElementById('app'));
});