import getPaths from './lib/getPaths.js'
import path from 'path'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import extend from 'extend'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import cssnano from 'cssnano'

const isDebug = process.argv[1].endsWith('dev');

const bootstrapLoader = `bootstrap-loader/lib/bootstrap.loader?configFilePath=${__dirname}/.bootstraprc!bootstrap-loader/no-op.js`;
let config = {
    context: path.resolve(__dirname, '../public/js'),
    entry: {
        index: [bootstrapLoader, './index.js'],
        content: [bootstrapLoader, './content.js'],
        admin: [bootstrapLoader, './admin.js'],
    },
    node: {
        fs: 'empty'
    },
    resolve: {
        extensions: ['*', '.js']
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: 'url-loader',
                query: {
                    name: isDebug ? 'images/[name].[ext]?[hash]' : 'images/[hash].[ext]',
                    limit: isDebug ? 1 : 2017,
                },
            },
            {
                test: /\.(eot|ttf|wav|mp3)$/,
                use: isDebug ? 'file-loader?name=media/[name].[ext]?[hash]' : 'file-loader?name=media/[hash].[ext]',
            }
        ]
    },
    devtool: isDebug ? 'cheap-module-eval-source-map' : 'cheap-module-eval-source-map',
    stats: {
        assets: true,
        cached: false,
        chunks: false,
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function() {
                    return isDebug ? [autoprefixer] : [cssnano, autoprefixer];
                }

            }
        }),
        new ExtractTextPlugin({ filename: isDebug ? 'css/[name].bundle.css' : 'css/[name].bundle.css?[hash]-[chunkhash]-[contenthash]-[name]' }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: isDebug ? true : false
            }
        })
    ]
}

const devConfig = extend(true, {}, config, {
    output: {
        path: '/',
        publicPath: '/',
        filename: 'js/[name].bundle.js'
    }

})

const buildConfig = extend(true, {}, config, {

    output: {
        path: path.resolve(__dirname, '../build/public'),
        publicPath: '/',
        filename: 'js/[name].bundle.js'
    }

})
export default [devConfig, buildConfig];