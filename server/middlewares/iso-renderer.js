import React, { Component, PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import store from 'src/store'
import routes from 'src/pages/routes'
import Stylizer from 'src/utils/stylizer'

export default (assets) => {
	return (req, res, next) => {
		if(process.env.ISOMORPHIC){
			match({ routes, location: req.url }, (err, redirect, props) => {
				let css = []
			    let html = renderToString(
			    	<Provider store={store}>
				    	<Stylizer insertCss={styles => css.push(styles._getCss())}>
				    		<RouterContext {...props} />
				    	</Stylizer>
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