import path from 'path'
import express from 'express'
import _ from 'lodash'

import compression from 'compression'
import webpack from 'webpack'
import webpackConfig from './webpack.config'
import WebpackDevServer from 'webpack-dev-server'
import proxy from 'proxy-middleware'
import url from 'url'

import render from './render'

const app = express()

const webpackAssets = process.env.NODE_ENV === 'production' ? require('json!./webpack-assets.json') : require('json!./webpack-assets-dev.json')
const PORT = 3000;

if(process.env.NODE_ENV !== 'production'){

	app.use('/scripts', proxy(url.parse('http://0.0.0.0:3001/scripts')));
	app.use('/styles', proxy(url.parse('http://0.0.0.0:3001/styles')));

	var server = new WebpackDevServer(webpack(webpackConfig), {
		publicPath: webpackConfig.output.publicPath,
		contentBase: webpackConfig.output.contentBase,
		hot: true,
		quiet: true,
		noInfo: true,
		stats: {
	    	colors: true
	  	},
		historyApiFallback: true
	});

	server.listen(3001, function () {
		console.log('Listening at http://localhost:3001/');
	});
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

app.listen(PORT, function () {
	console.log('Listening at http://localhost:3000/');
});