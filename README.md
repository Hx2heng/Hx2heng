# blogDemo
 一个简单的博客轮子

## 使用到的东西
- Express
- Babel for ES6
- ejs

## 问题&解决
#### 1. supervisor 监听 es6 文件
supervisor 默认监听不经过处理的js文件，所如果是直接监听es6语法的js文件，那么会出现语法错。

所以，采用`babel-register`对es6文件进行预转换，并且设置`supervisor`：

	supervisor -w tools,router -- -r babel-register tools/start

`supervisor`的官方文档可参见 :[ https://www.npmjs.com/package/supervisor](https://www.npmjs.com/package/supervisor)

#### 2. ejs模板引擎不同页面引用不同样式文件
ejs是款简单好用的模板引擎，但是网上很多人说ejs在不同的页面引用不同的文件非常不方便，有人给出在res.locals给模板传参的方法，把页面的引用样式文件从后台传给模板引擎进行解析。个人感觉但是这种方法不妥，管理起来不方便，样式文件就应该写在视图页面，不应该在路由里面写。

其实可以通过ejs的include解决这个问题。

ejs2.0+的include函数已经支持传参功能。利用这个特性我们可以简单实现ejs模板引擎不同页面引用不同样式文件了。具体实现：

在首页的视图中往header里面穿参数：
	
	<%- include('layouts/header',{styles:['index','jquery']}) %>

然后在header的视图中修改引用样式：

	 <% for(var i=0; i<styles.length; i++) {%>
       <link rel="stylesheet" href="/css/<%= styles[i] %>.css">
    <% } %>

#### 3. server.address().address 获取到IPv6格式的主机地址"::"？
以为如果计算机默认启用了IPv6，那么 server.address().address 获取到的就是IPv6的地址。如下：

	var express      = require('express');
	var app          = express();
	var server = app.listen(3000, function () {
    	var host = server.address().address;
    	var port = server.address().port;
    	console.log('running at http://' + host + ':' + port)
	});
	
	res：'server running at http://:::3000'	
如果想得到IPv4的主机地址，请显式得给listen传递主机名：
	
	var express      = require('express');
	var app          = express();
	var server = app.listen(3000,'localhost', function () {
    	var host = server.address().address;
    	var port = server.address().port;
    	console.log('running at http://' + host + ':' + port)
	});
	
	res：'server running at http://127.0.0.1:3000'