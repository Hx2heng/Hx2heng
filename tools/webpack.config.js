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
    resolve:{
        modules: [path.resolve(__dirname, "../public"), "../node_modules"]
        
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['env']
            }
        }, 
        {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" 
            }, {
                loader: "css-loader" 
            }, {
                loader: "sass-loader"
            }]
        },
        {
            test: /\.css$/,
            exclude: /(node_modules|bower_components)/,
            use: [ 'style-loader', 'css-loader']
        }
        ]
    }
}

export default config
