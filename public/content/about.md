# webDemo
 一个多页应用的架构

作者：黄信政

e-mail：397323988@qq.com

### 特性

Express作为服务器后台，使用ejs作为引擎模板，采用MVC开发模式。前端高度模块化，便于维护。

使用ES6，编码更轻松。

使用browser-sync实现跨终端浏览器同步测试工具，提高开发效率。

使用webpack打包文件，解决繁杂的项目依赖、文件处理等问题。通过webpack开发中间件，实现开发阶段快速打包文件到内存，避免长时间等待。

webpack样式文件独立打包。

使用bootstrap作为前端UI框架，并且通过webpack实现按需加载模块，节省网站流量。同时提供自定义修改，极大方便更改整站样式。

使用sass编写css，用最高效的方式，以少量的代码创建复杂的设计。

更多特性查看项目。



## 使用
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