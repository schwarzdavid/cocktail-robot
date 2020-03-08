const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const common = {
	devtool: isDev ? 'source-map' : false,
	mode: isProd ? 'production' : 'development',
	output: {
		path: path.join(__dirname, 'dist')
	},
	resolve: {
		alias: {
			'~': path.join(__dirname, 'node_modules')
		},
		extensions: ['*', '.vue', '.js', '.json', '.ts']
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: ['ts-loader'],
				exclude: /node_modules/
			}
		]
	}
};

module.exports = {
	common, isDev, isProd
};
