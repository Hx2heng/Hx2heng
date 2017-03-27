

## Usage
1.安装nodejs

2.克隆项目

3.安装

	npm i

项目目录

    --root
		|--config				//配置文件
		|--middlewares			//中间件
		|--pubulic				//静态资源
		 |--js
		 |--css/sass
		 |--images
		|--router				//路由控制器
		|--tools				//工具
		 |--lib
		 |--webpack.config.js
		|--views				//视图文件
		 |--components
		|--package.json
		|--...


4.开发模式

	npm run dev

启动服务成功之后进入`localhost:3001` 开发网址

5.构建

	npm run build

    
将在根目录下创建build文件夹。build文件夹直接可以放到服务器上开启服务。

6.启动

	进入bulid目录: npm start