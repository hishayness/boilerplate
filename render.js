import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from './src/routes/routes'

module.exports = (url, cb) => {
	match({ routes, location: url }, (err, redirect, props) => {
	    cb(err, renderToString(<RouterContext {...props}/>));
	})
}