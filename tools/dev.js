import appPro from './start.js';
import browserSync from 'browser-sync';
import serverCfg from '../config/default.js';

let devPro = async ()=>{
	await appPro();
	const bs = browserSync.create();
	bs.init({
	  files: "**",//监听整个项目
	  proxy: {
	    target: serverCfg.host+':'+serverCfg.port
	  },
	});
}

devPro();