const path 		= require('path')
const UglifyJS 	= require('uglifyjs-webpack-plugin')

const dev = process.env.NODE_ENV == "dev"

let CSSLoaders = [
	'style-loader',
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
					browsers: ["last 2 versions", "ie > 8"]
				}),
				require('cssnano')()
		    ]
		}
	}
)
}

let config =
{
	mode 	: "development",
	entry	: './assets/js/app.js',
	output	:
	{
		path		: path.resolve('./dist'),
		filename	: 'bundle.js',
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
		
	],
	optimization:
	{
		minimizer: []
	}
}
if(!dev) {
	config.plugins.push(new UglifyJS({
		extractComments	: true
	}))
}

module.exports = config