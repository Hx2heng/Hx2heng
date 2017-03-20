import appPro from './start.js';
import browserSync from 'browser-sync';
import serverCfg from '../config/default.js';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackCfg from './webpack.config.js'
import path from 'path'

let devPro = async() => {
    let app, bs;
    await new Promise(resolve => {
        const bundler = webpack(webpackCfg);
        const wpdm = webpackDevMiddleware(bundler, {
            publicPath: webpackCfg.output.publicPath
        });

        let handleBundleComplete = async() => {
            if (!app) {
                await appPro().then(exApp => { app = exApp });
                //app.use(wpdm)
                //启动 browser-sync
                bs = browserSync.create();
                bs.init({
                    files: path.resolve(__dirname, '../public/*/**'), //监听目录
                    proxy: {
                        target: serverCfg.host + ':' + serverCfg.port,
                        middleware: [wpdm]
                    },
                    open: false,
                    reloadOnRestart: true
                }, resolve);
            } else {
                bs.reload();
            }

        };
        bundler.plugin('done', () => handleBundleComplete());
    })
}

devPro();