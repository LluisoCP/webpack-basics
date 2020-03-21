const path 						= require('path')
const UglifyJS 					= require('uglifyjs-webpack-plugin')
const ExtractCSSPlugin 			= require('mini-css-extract-plugin')
const ManifestPlugin 			= require('webpack-manifest-plugin')
const { CleanWebpackPlugin }	= require('clean-webpack-plugin')

const dev = process.env.NODE_ENV == "dev"

let CSSLoaders = [
	ExtractCSSPlugin.loader,
	{
		loader: 'css-loader',
		options: 
		{
			importLoaders: 1
		} 
	}
]

if (!dev) {
	CSSLoaders.push(
	{
		loader: 'postcss-loader',
		options: 
		{
			ident 	: 'postcss',
			plugins : (loader) => [
				require('autoprefixer')({
					overrideBrowserslist: ['last 2 versions', 'ie > 8']
				}),
				require('cssnano')()
		    ]
		}
	}
)
}

let config =
{
	mode 	: 'none', 
	entry	: './assets/js/app.js',
	output	:
	{
		path		: path.resolve('./dist'),
		filename	: dev ? '[name].js' : '[name].[chunkhash:8].js',
		publicPath	: './dist/'
	},
	watch: dev,
	devtool: dev && "eval-cheap-module-source-map",
	module:
	{
		rules: [
			{
				test	: /\.js$/,
				exclude	: /(node_modules|bower_components)/,
				use		: ['babel-loader']
			},
			{
				test: require.resolve('jquery'),
				use	:[
					{
						loader 	: 'expose-loader',
						options	: 'jQuery'
					}
				]
			},
			{
				test: /\.css$/,
				use : CSSLoaders
			},
			{
				test: /\.scss$/,
				use : [...CSSLoaders, 'sass-loader']
			}
		]
	},
	plugins: [
		new ExtractCSSPlugin({
			filename: dev ? '[name].css' : '[name].[contenthash:8].css'
		})
	],
	optimization:
	{
		minimizer: []
	}
}
if(!dev) {
	config.plugins.push(
		new UglifyJS(
		{
			extractComments	: true
		}),
		new ManifestPlugin(),
		new CleanWebpackPlugin(
		{
			root	: path.resolve('./'),
			verbose	: true,
			dry		: false
		}))
}

module.exports = config