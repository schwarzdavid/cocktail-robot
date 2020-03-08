const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const config = {
	entry: path.join(__dirname, 'src/renderer/index.ts'),
	target: 'electron-renderer',
	output: {
		path: path.join(__dirname, 'dist/renderer/')
	},
	devtool: isDev ? 'source-map' : false,
	mode: isProd ? 'production' : 'development',
	resolve: {
		alias: {
			'~': path.join(__dirname, 'node_modules')
		},
		extensions: ['*', '.vue', '.js', '.json', '.ts']
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: ['vue-loader']
			},
			{
				test: /\.ts$/,
				use: [{
					loader: 'ts-loader',
					options: {
						appendTsSuffixTo: [/\.vue$/],
						configFile: path.join(__dirname, 'tsconfig.renderer.json')
					}
				}],
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: [
					isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
					'css-loader',
					'resolve-url-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							sourceMapContents: false
						}
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg|webp)$/,
				use: [{
					loader: 'url-loader',
					options: {
						outputPath: 'img/',
						limit: 8192
					}
				}]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)$/,
				use: [{
					loader: 'file-loader',
					options: {
						outputPath: 'fonts/'
					}
				}]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src/renderer/index.ejs')
		})
	]
};

module.exports = config;

