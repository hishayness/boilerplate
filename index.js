var path = require('path');
var express = require('express');

var compression = require('compression');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var WebpackDevServer = require('webpack-dev-server');
var webpackAssets = process.env.NODE_ENV === 'production' ? require('./webpack-assets.json') : require('./webpack-assets-dev.json');

var app = express();

const PORT = 3000;

if(process.env.NODE_ENV !== 'production'){

	var proxy = require('proxy-middleware');
	var url = require('url');

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

app.get('*', function (req, res) {
	res.render('index', webpackAssets);
})

app.listen(PORT, function () {
	console.log('Listening at http://localhost:3000/');
});