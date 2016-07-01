import path from 'path'
import express from 'express'
import _ from 'lodash'

import compression from 'compression'
import webpack from 'webpack'
import webpackConfig from './webpack.config'
import WebpackDevServer from 'webpack-dev-server'

import render from './render'

var webpackAssets;
var app;
var server = null;

const PORT = 3000;

if(process.env.NODE_ENV === 'production'){
	webpackAssets = require('json!./webpack-assets.json');
	app = express();
}
else {
	webpackAssets = require('json!./webpack-assets-dev.json');
	server = new WebpackDevServer(webpack(webpackConfig), {
		publicPath: webpackConfig.output.publicPath,
		contentBase: webpackConfig.output.contentBase,
		hot: true,
		stats: {
	    	colors: true
	  	},
		historyApiFallback: true
	});

	app = server.app;
}

app.use(compression());
app.use(express.static(path.join(__dirname, 'src/public')));
app.set('views', path.join(__dirname, 'src/server/views'));
app.set('view engine', 'pug');

app.get('*', (req, res) => {
	if(process.env.ISOMORPHIC){
		render(req.url, function(err, html){
			webpackAssets.html = html;
			res.render('index', webpackAssets);
		});
	}
	else {
		res.render('index', webpackAssets);
	}
})

if(process.env.NODE_ENV === 'production'){
	app.listen(PORT, function () {
		console.log('Listening at http://localhost:3000/');
	});
}
else {
	server.listen(PORT, function () {
		console.log('Listening at http://localhost:3000/');
	});
}