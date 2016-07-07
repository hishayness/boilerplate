import path from 'path'
import express from 'express'

import compression from 'compression'
import webpack from 'webpack'
import webpackConfig from './webpack.config'
import WebpackDevServer from 'webpack-dev-server'
import proxy from 'proxy-middleware'
import url from 'url'

import IsoRenderer from 'server/middlewares/iso-renderer'

const webpackAssets = process.env.NODE_ENV === 'production' ? require('./webpack-assets') : require('./webpack-assets-default');
const app = express()
const PORT = 4000

if(process.env.NODE_ENV !== 'production'){

	app.all('/build/*', proxy(url.parse('http://0.0.0.0:3001')));

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
		console.log('Listening at http://0.0.0.0:3001/');
	});

}

app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');

app.get('*', IsoRenderer(webpackAssets))

app.listen(PORT, function () {
	console.log('Listening at http://localhost:3000/');
});