import React, { Component, PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from 'src/routes/routes'
import Provider from 'src/provider'

export default (assets) => {
	return (req, res, next) => {
		if(process.env.ISOMORPHIC){
			match({ routes, location: req.url }, (err, redirect, props) => {
				const css = []
			    const html = renderToString(
			    	<Provider insertCss={styles => css.push(styles._getCss())}>
			    		<RouterContext {...props} />
			    	</Provider>)

				assets.html = html
				assets.css = css.join('')

				return res.render('index', assets);
			})
		}
		else {
			return res.render('index', assets);
		}

		return next()
	}
}