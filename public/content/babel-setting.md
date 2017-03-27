es6预设置
---
使用babel对es6进行转换：

下载
     
	 "devDependencies": {
    "babel": "6.23.0",
    "babel-cli": "6.23.0",
    "babel-core": "6.23.1",
    "babel-loader": "6.4.0",//webpack的babel-loader
    "babel-plugin-transform-es2015-modules-commonjs": "6.23.0",//允许使用es6的modules
    "babel-preset-env": "1.2.1",
    "babel-preset-react": "6.23.0",//支持jsx转换
    "babel-preset-stage-0": "6.22.0"
	}
配置可以不写在.babelrc里，直接写在package.json

     "babel": {
    "presets": [
      "react",
      "stage-0"
    ],
    "plugins": [
      "transform-es2015-modules-commonjs"
    ]
    }
npm script直接运行babel-node

    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "babel-node tools/start",//表示执行tools文件夹的start文件，执行之前进行es6转码
    "dev": "supervisor -w tools,router,middlewares,config,views -- -r babel-register tools/dev"
    }