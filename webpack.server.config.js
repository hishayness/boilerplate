var webpack = require('webpack');
var fs = require('fs')
var path = require('path')
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'index.iso.js'),
	output: {
		path: './src/server/scripts',
		filename: 'index.iso.bundle.js'
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
  			'framework': path.join(__dirname, 'src/common')
  		},
    	extensions: [
			'',
			'.css',
			'.js',
			'.jsx',
			'.scss',
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
				path.join(__dirname, 'src/server/scripts'),
			], {
			root: process.cwd()
		}),
		new webpack.DefinePlugin({
			"process.env.BROWSER": false
		})
	]
}