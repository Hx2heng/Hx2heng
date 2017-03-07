let config = {
	port:3000,
	session:{
		secret:'huangxinzheng',
		resave:true,//即使 session 没有被修改，也保存 session 值，默认为 true（！不添加报错,下同）
		saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
		cookie: {
		    maxAge: 1000*60*60*24// 过期时间，过期后 cookie 中的 session id 自动删除
		}
	},
	mongodb:'mongodb://localhost:27017//myblog'
}

export default config