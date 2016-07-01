import React from 'react'
import { render } from 'react-dom'
import { match, Router, browserHistory } from 'react-router'
import routes from './routes'

match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
	render(<Router {...renderProps} />, document.getElementById('app'));
});