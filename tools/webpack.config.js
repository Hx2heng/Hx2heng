import getPaths from './lib/getPaths.js'
import path from 'path'
import webpack from 'webpack'

let config = {
    entry: {
        index: path.resolve(__dirname, '../public/js/index.js'),
        test: path.resolve(__dirname, '../public/js/test.js'),
    },
    node: {
        fs: 'empty'
    },
    output: {
        path: path.resolve(__dirname, '../bulid/public/'),
        publicPath: '/js/',
        filename: '[name].bundle.js'
    },
    resolve: {
        modules: [path.resolve(__dirname, "../public"), "../node_modules"],
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
        })
    ]
}

export default config