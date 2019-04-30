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
        test: /\.png|svg|jpg$/,
        loader: 'file-loader?name=assets/[name].[ext]',
      },
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "fonts/[name].[ext]",
					},
				},
			},
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