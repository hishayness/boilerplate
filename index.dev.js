var path = require('path');
var config = require('./webpack.config');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackAssets = require('./webpack-assets.json');

var server = new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	contentBase: config.output.contentBase,
	hot: true,
	stats: {
    	colors: true
  	},
	historyApiFallback: true
});

server.app.set('views', path.join(__dirname, 'src/server/views'));
server.app.set('view engine', 'pug');

server.app.get('*', function (req, res) {
	res.render('index', webpackAssets);
})

server.listen(3000, 'localhost', function (err, result) {
	if (err) {
		return console.log(err);
	}
	console.log('Listening at http://localhost:3000/');
});