var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var AssetsPlugin = require('assets-webpack-plugin');

var config = {
	entry: {
		app: ['./src/routes'],
		vendor: [
			'react',
			'react-dom',
			'react-router/lib/Router',
			'react-router/lib/Link',
			'react-router/lib/browserHistory'
		]
	},
	output: {
		path: path.resolve(__dirname, 'public/build'),
		filename: 'scripts/[name].' + (process.env.NODE_ENV === 'production' ? '[chunkhash].' : '') + 'js',
        chunkFilename: 'scripts/' + (process.env.NODE_ENV === 'production' ? '[chunkhash].' : '') + '[id].chunk.js',
        publicPath: '/build/',
        contentBase: './public'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src'),
				loaders: ['react-hot', 'babel'] //TODO - remove react-hot for production
			},
			{
				test: /\.less$/,
				include: path.resolve(__dirname, 'src'),
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
			},
			{
				test: /\.css$/,
				include: path.resolve(__dirname, 'src'),
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			},
//			{
//				test: /\.(jpe?g|png|gif|svg)$/i,
//				include: path.join(__dirname, 'src'),
//				loader: 'url-loader?limit=1000000'
//			}
		]
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
	plugins: [
		new CleanWebpackPlugin([
				path.join(__dirname, 'public/build'),
				path.join(__dirname, 'webpack-assets.js')
			], {
			root: process.cwd()
		}),
		new AssetsPlugin({
			fullPath: false,
			filename: 'webpack-assets.js',
			processOutput: function(assets){
				return 'module.exports = ' + JSON.stringify(assets);
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest']
		}),
        new ExtractTextPlugin('styles/[name].' + (process.env.NODE_ENV === 'production' ? '[contenthash].' : '') + 'css'),
		new webpack.DefinePlugin({
			'__BROWSER__': true
		})
	]
}

if(process.env.NODE_ENV === 'production'){
	config.plugins.unshift(
		new webpack.DefinePlugin({
			'global.GENTLY': false,
			'process.env.NODE_ENV': '"production"'
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	);
}
else {
	config.entry.app.unshift(
		'webpack-dev-server/client?http://0.0.0.0:3001',
		'webpack/hot/only-dev-server'
	);

	config.plugins.unshift(
		new webpack.HotModuleReplacementPlugin()
	)

	config.debug = true;
}

module.exports = config;