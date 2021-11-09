const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: './js/index.ts',
	output: {
		filename: './layer-inpicture-sdk.production.min.js',
		path: path.resolve(__dirname, 'umd'),
		clean: true,
        library: 'layer',
        libraryTarget: 'umd',
	},
	devServer: {
		historyApiFallback: true,
		static: path.resolve(__dirname, 'umd'),
		open: true,
		compress: true,
		hot: true,
		port: 3000,
	},
	target: ['web', 'es5'],
	plugins: [
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
                test: /\.svg/,
                type: 'asset/inline'
            },
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
}
