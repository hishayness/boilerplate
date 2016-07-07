var path = require('path');
var autoprefixer = require('autoprefixer');
var AUTOPREFIXER_BROWSERS = [
	'Android 2.3',
	'Android >= 4',
	'Chrome >= 35',
	'Firefox >= 31',
	'Explorer >= 9',
	'iOS >= 7',
	'Opera >= 12',
	'Safari >= 7.1',
];

module.exports = {
	resolve: {
		alias: {
			'server': path.resolve(__dirname, '../server'),
			'framework': path.resolve(__dirname, '../src/common'),
			'src': path.resolve(__dirname, '../src'),
			'images': path.resolve(__dirname, '../public/images')
		},
		extensions: [
			'',
			'.css',
			'.js',
			'.jsx',
			'.less',
		]
	},
	postcss: [ autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }) ]
}
