var webpack = require('webpack');
var path = require('path');

var config = {
	entry: [
		'./src/routes',
	],
	output: {
		path: 'src/client/public/scripts',
		filename: 'bundle.js',
		publicPath: '/scripts/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['react-hot', 'babel']
			}
		]
	},
  	resolve: {
  		alias: {
  			'framework': __dirname + '/src/common'
  		},
    	extensions: [
			'',
			'.css',
			'.js',
			'.jsx',
			'.scss',
    	]
  	},
	plugins: process.env.NODE_ENV === 'production' ? [
		new webpack.DefinePlugin({
			"global.GENTLY": false,
			"process.env": {
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin()
	]: [
		new webpack.HotModuleReplacementPlugin()
	],
}

module.exports = config;