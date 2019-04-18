const path = require('path');
const clean = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	entry: path.join(__dirname, './src/index.js'),
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
    
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(s*)css$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader' 
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader',
					{
					  loader: 'image-webpack-loader',
					  options: {
						path: './assets',
						outputPath: 'dist',
						name: '[path][name].[ext]',
						emitFile: true,
						publicPath: 'dist',
						mozjpeg: {
						  progressive: true,
						  quality: 65
						},
						// optipng.enabled: false will disable optipng
						optipng: {
						  enabled: false,
						},
						pngquant: {
						  quality: '65-90',
						  speed: 4
						},
						gifsicle: {
						  interlaced: false,
						},
						// the webp option will enable WEBP
						webp: {
						  quality: 75
						}
					  }
					},
				  ],
			}
		]
	},
    
	plugins: [ 
		new clean(),
		new htmlWebpackPlugin({
			template: `${__dirname}/src/index.html`,
			filename: 'index.html',
			inject: true,
		}),
	],

	watch: true,
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		watchContentBase: true,
		compress: true,
		port: 4000
	},
};