import getPaths from './lib/getPaths.js'
import path from 'path'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import extend from 'extend'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import cssnano from 'cssnano'

const bootstrapLoader = `bootstrap-loader/lib/bootstrap.loader?configFilePath=${__dirname}/.bootstraprc!bootstrap-loader/no-op.js`;



let config = {
    context: path.resolve(__dirname, '../public/js'),
    entry: {
        index: [bootstrapLoader, './index.js'],
        content: [bootstrapLoader, './content.js'],
        test: './test.js',
    },
    node: {
        fs: 'empty'
    },
    output: {
        path: '/',
        publicPath: '/',
        filename: 'js/[name].bundle.js'
    },
    resolve: {
        extensions: ['*', '.js']
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
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
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(ttf|eot|svg|jpg|png|gif)(\?[\s\S]+)?$/,
                use: 'file-loader?name=[path][name].[ext]',
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function() {
                    return [cssnano, autoprefixer];
                }

            }
        }),
        new ExtractTextPlugin({ filename: 'css/[name].bundle.css?[hash]-[chunkhash]-[contenthash]-[name]' })
    ]
}

const devConfig = extend(true, {}, config, {
    devtool: 'cheap-module-eval-source-map',
})

export default [devConfig];