var path = require('path');
var express = require('express');

var compression = require('compression');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var WebpackDevServer = require('webpack-dev-server');
var webpackAssets;

var app;
var server = null;

const PORT = 3000;

if(process.env.NODE_ENV === 'production'){
	webpackAssets = require('./webpack-assets.json');
	app = express();
}
else {
	webpackAssets = require('./webpack-assets-dev.json');
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

app.get('*', function (req, res) {
	res.render('index', webpackAssets);
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