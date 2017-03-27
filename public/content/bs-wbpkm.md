#### 4. browser-sync 与 webpack-dev-middleware 的配合？

		const bundler = webpack(webpackCfg);
		const wpdm = webpackDevMiddleware(bundler,{
			publicPath: webpackCfg.output.publicPath
		});

		let handleBundleComplete = async () => {
			if(!app){
				await appPro().then(exApp=>{app = exApp});
				//app.use(wpdm)
				//启动 browser-sync
				bs = browserSync.create();
				bs.init({
				  files: path.resolve(__dirname, '../public/*/**'),//监听目录
				  proxy: {
				    target: serverCfg.host+':'+serverCfg.port,
				    middleware:[wpdm]
				  },
				  open: false,
				  reloadOnRestart: true
				},resolve);
			}else{
				bs.reload();
			}
			
		};
		bundler.plugin('done', () => handleBundleComplete());
具体流程：

-	1.先webpack生成bundler（此阶段并不执行生成）
-	2.用webpack-dev-middleware把bundler包成中间件wpdm
-	3.第一步生成bundler成功后启动服务器
-	4.启动服务器成功后创建并初始化browser-sync
-	5.第二步生成的中间件wpdm给到browser-sync中间件设置
-	6.每次触发browser-sync的时候都执行中间件wpdm
-	7.第一次之后的中间件wpdm执行都不用再启动服务器和创建browser-sync，只是执行browser-sync的reload事件