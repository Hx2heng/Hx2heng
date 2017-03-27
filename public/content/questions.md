es6 - 异步操作 async/await 语法
---
async函数允许你像同步写法那样去写异步操作，async函数里面关键字await后面接一个Promise，此时函数执行会在await后的Promise执行完成后才会往下执行。

举个例子，创建服务器是异步操作，我们需要在服务器创建完成后才布置路由。首先创建服务器，并把它包在Promise里面：

    let runServer = (app)=>{
		return new Promise(resolve=>{
			var server = app.listen('3000',()=>{
				var host = server.address().address;
  				var port = server.address().port;
				console.log('server running at http://%s:%s', host, port);
				resolve();
			})
		}) 
    } 

然后在主体事件中，写异步操作：

     let appPro = async ()=>{
		let app = express();
		//等待启动服务 
		await runServer(app);
		//启动路由
		router(app);
    }

此时，路由 router() 会在服务器创建完成后执行。

express 将session 存入Redis
---

    import session from 'express-session';
    import connectRedis from 'connect-redis';

    let sessionCfg = {
		secret:'huangxinzheng',
		resave:true,//即使 session 没有被修改，也保存 session 值，默认为 true（！不添加报错,下同）
		saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
		cookie: {
		    maxAge: 1000*60*60*24// 过期时间，过期后 cookie 中的 session id 自动删除
		}
	}
	
     //设置session,将session存在 Redis 中
	var RedisStore = connectRedis(session);
	let rs = new RedisStore();
	app.use(session(extend(true,{},serverCfg,rs)));

express 中间件的使用
---
express的中间件很重要，甚至可以说express就是通过中间来实现应用的。express有很多开源中间件可以给我们下载使用（比如express-session）。把中间件放进app.use()里就代表每次服务器请求都会经过这个中间件（假设中间件没有停止下一个的情况下）。我们也可以自己写中间件，其实中间件就是一个函数，这个函数有`req`，`res`，`next` 三个参数，分别代表请求对象，响应对象，和next方法。执行next方法可过渡当前中间件。

写一个记录访问次数的中间件，配合session记录一天内用户的访问次数：

    let showReqTimes = (req,res,next) =>{
	if(!req.session.reqTimes){
		req.session.reqTimes =1;
		res.send('你第1次访问了本网站');
	}else{
		req.session.reqTimes++;
		res.send('<p>你第'+req.session.reqTimes+'次访问了本网站</p>');
	}
	
	next();//执行下一个中间件
    }

    export default showReqTimes

假设是记录在访问'/'的时候：

    import showReqTimes  from './showReqTimes.js'
    app.get('/', showReqTimes, (req, res) => {//此时每次访问根目录之后都会进入showReqTimes这个中间件
		//do something..
    })

webpack新版本的写法变化-Loader
---
webpack2.2较上一代在语法方面有了变化，特别是loader：

	原先写法:
	module: {
		loaders: [{
			test: /\.css$/,
			loader: 'style!css'
		}]
	}
	现在写法：
	 module: {
        rules: [{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader']
        }]
    }

loaders改为了rules，loader改为了use。语义上更加容易理解了，“对不同的文件类型使用不同的规则”。webpack 虽好，但是配置的时候很麻烦，更新了新版本之后，写法不习惯，报错也是莫名其妙。开发的要一边看官方文档，花了很多时间，看来要多花点时间去适应。


supervisor 监听 es6 文件
---
supervisor 默认监听不经过处理的js文件，所如果是直接监听es6语法的js文件，那么会出现语法错。

所以，采用`babel-register`对es6文件进行预转换，并且设置`supervisor`：

	supervisor -w tools,router -- -r babel-register tools/start

`supervisor`的官方文档可参见 :[ https://www.npmjs.com/package/supervisor](https://www.npmjs.com/package/supervisor)

ejs模板引擎不同页面引用不同样式文件
---
ejs是款简单好用的模板引擎，但是网上很多人说ejs在不同的页面引用不同的文件非常不方便，有人给出在res.locals给模板传参的方法，把页面的引用样式文件从后台传给模板引擎进行解析。个人感觉但是这种方法不妥，管理起来不方便，样式文件就应该写在视图页面，不应该在路由里面写。

其实可以通过ejs的include解决这个问题。

ejs2.0+的include函数已经支持传参功能。利用这个特性我们可以简单实现ejs模板引擎不同页面引用不同样式文件了。具体实现：

在首页的视图中往header里面穿参数：
	
	<%- include('layouts/header',{styles:['index','jquery']}) %>

然后在header的视图中修改引用样式：

	 <% for(var i=0; i<styles.length; i++) {%>
       <link rel="stylesheet" href="/css/<%= styles[i] %>.css">
    <% } %>