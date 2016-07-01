var webpack = require('webpack');
var fs = require('fs')
var path = require('path')
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'index.js'),
	output: {
		path: './server/scripts',
		filename: 'index.bundle.js'
	},
	target: 'node',
	// keep node_module paths out of the bundle
	externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat(
		['react-dom/server', 'react/addons',]).reduce(function (ext, mod) {
			ext[mod] = 'commonjs ' + mod
			return ext
		},
	{}),
	node: {
		__filename: true,
		__dirname: true
	},
  	resolve: {
  		alias: {
  			'framework': path.resolve(__dirname, 'src/common'),
  			'images': path.resolve(__dirname, 'public/images')
  		},
    	extensions: [
			'',
			'.css',
			'.js',
			'.jsx',
			'.less',
    	]
  	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['babel'] //TODO - remove react-hot for production
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin([
				path.resolve(__dirname, 'server/scripts'),
			], {
			root: process.cwd()
		}),
		new webpack.DefinePlugin({
			'__BROWSER__': false
		})
	]
}