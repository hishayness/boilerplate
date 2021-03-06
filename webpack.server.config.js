var webpack = require('webpack');
var fs = require('fs')
var path = require('path')

var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpackConfigsShared = require('./configs/webpack.shared');

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
  	resolve: webpackConfigsShared.resolve,
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['babel']
			},
			{
				test: /\.less$/,
				include: path.resolve(__dirname, 'src'),
				loader: 'isomorphic-style-loader!css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]!less-loader!postcss-loader'

			}
		]
	},
    postcss: webpackConfigsShared.postcss,
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