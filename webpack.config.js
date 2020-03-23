const path 						= require('path')
const UglifyJS 					= require('uglifyjs-webpack-plugin')
const ExtractCSSPlugin 			= require('mini-css-extract-plugin')
const ManifestPlugin 			= require('webpack-manifest-plugin')
const { CleanWebpackPlugin }	= require('clean-webpack-plugin')

const dev = process.env.NODE_ENV == "dev"

let CSSLoaders = [
	{
		loader : ExtractCSSPlugin.loader,
		options:
		{
			publicPath 		: './'
		}
	},
	{
		loader: 'css-loader',
		options: 
		{
			importLoaders	: 1
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
	entry	:
	{
		app: ['./assets/js/app.js', './assets/scss/app.scss']
	},
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
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'file-loader',
				options:
				{
					name	: '[name].[hash:8].[ext]',
					context	: 'assets'
				}
			},
			{
		        test: /\.(png|jpe?g|gif|svg)$/i,
		        use : [
					{
						loader : 'url-loader',
						options:
						{
							limit: 8192,
							name : '[name].[hash:8].[ext]'
						},
					},
					{
						loader : 'img-loader',
						options:
						{
							enabled: !dev
						}
					}
		        ],
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