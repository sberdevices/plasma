const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: './js/index.ts',
	output: {
		filename: './[name].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
        library: 'layer',
        libraryTarget: 'umd',
	},
	devServer: {
		historyApiFallback: true,
		static: path.resolve(__dirname, 'dist'),
		open: true,
		compress: true,
		hot: true,
		port: 3000,
	},
	target: ['web', 'es5'],
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: path.resolve(__dirname, 'src/assets'), to: '.' },
			],
		}),
		new MiniCssExtractPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
}
