var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var webpackMerge = require('webpack-merge');

// backend

var nodeModules = fs.readdirSync('node_modules')
	.filter(function(x) {
		return ['.bin'].indexOf(x) === -1;
	});

var backendConfig = {
	entry: [
		// 'webpack/hot/signal.js',
		'./dist/src/main'
	],
	target: 'node',
	output: {
		path: path.join(__dirname, 'bundle'),
		filename: 'backend.js'
	},
	node: {
		__dirname: true,
		__filename: true
	},
	externals: [
		function(context, request, callback) {
			var pathStart = request.split('/')[0];
			if (nodeModules.indexOf(pathStart) >= 0 && request != 'webpack/hot/signal.js') {
				return callback(null, "commonjs " + request);
			};
			callback();
		}
	],
	recordsPath: path.join(__dirname, 'bundle/_records'),
	plugins: [
		new webpack.IgnorePlugin(/\.(css|less)$/),
		new webpack.BannerPlugin('require("source-map-support").install();',
			{ raw: true, entryOnly: false }),
	]
};

var defaultConfig = {
	devtool: "source-map",

	output: {
		filename: '[name].bundle.js',
		sourceMapFilename: '[name].map',
		chunkFilename: '[id].chunk.js'
	},

	resolve: {
		extensions: [ ".ts", ".js" ],
		modules: [ path.resolve(__dirname, "node_modules") ]  // jshint ignore:line
	},

	devServer: {
		historyApiFallback: true,
		watchOptions: { aggregateTimeout: 300, poll: 1000 },
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
		}
	},

	node: {
		global: true,
		crypto: 'empty',
		__dirname: true,
		__filename: true,
		process: true,
		Buffer: false,
		clearImmediate: false,
		setImmediate: false
	}
};


module.exports = webpackMerge(defaultConfig, backendConfig);