import getPaths from './lib/getPaths.js'
import path from 'path'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import extend from 'extend'

let config = {
    context: path.resolve(__dirname, '../public/js'),
    entry: {
        index: [`bootstrap-loader/lib/bootstrap.loader?configFilePath=${__dirname}/.bootstraprc!bootstrap-loader/no-op.js`, './index.js'],
        test: './test.js',
    },
    node: {
        fs: 'empty'
    },
    output: {
        path: '/',
        publicPath: '/js/',
        filename: '[name].bundle.js'
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
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] },
            { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader',
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
                    return [autoprefixer];
                }

            }
        })
    ]
}

const devConfig = extend(true, {}, config, {
    devtool: 'cheap-module-eval-source-map',
})

export default [devConfig];