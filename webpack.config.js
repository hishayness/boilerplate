var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var AssetsPlugin = require('assets-webpack-plugin');
var prefix = process.env.NODE_ENV === 'production' ? 'dist' : 'src';

var config = {
	entry: [
		'./src/routes'
	],
	output: {
		path: path.join(__dirname, prefix + '/client/public'),
		filename: 'scripts/' + (process.env.NODE_ENV === 'production' ? '[hash].bundle.js' : 'bundle.js'),
        chunkFilename: 'scripts/' + (process.env.NODE_ENV === 'production' ? '[hash].[id].chunk.js' : '[id].chunk.js'),
        publicPath: '/',
        contentBase: './src/client'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: path.join(__dirname, 'src'),
				loaders: ['react-hot', 'babel']
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			}
		]
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
	plugins: [
        new ExtractTextPlugin('styles/' + (process.env.NODE_ENV === 'production' ? '[contenthash].[name].css' : '[name].css')),
		new AssetsPlugin({fullPath: false})
	]
}

if(process.env.NODE_ENV === 'production'){
	config.plugins.unshift(
		new webpack.DefinePlugin({
			"global.GENTLY": false,
			"process.env": {
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);
}
else {
	config.entry.unshift(
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server'
	);

	config.plugins.unshift(
		new webpack.HotModuleReplacementPlugin()
	)
}

module.exports = config;