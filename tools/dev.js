import appPro from './start.js';
import browserSync from 'browser-sync';
import serverCfg from '../config/default.js';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackCfgs from './webpack.config.js'
import path from 'path'



let devPro = async() => {
    let app, bs;
    await new Promise(resolve => {
        let webpackCfg = webpackCfgs[0];
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
                    files: [path.resolve(__dirname, '../public/*/**'), path.resolve(__dirname, '../views/**/*.ejs')], //监听目录
                    proxy: {
                        target: serverCfg.host + ':' + serverCfg.port,
                        middleware: [wpdm]
                    },
                    open: false,
                    notify: false,
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