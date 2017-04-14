import runServer from './runServer.js';
import express from 'express';
import router from '../router/router.js';
import flash from 'connect-flash';
import serverCfg from 'config-lite';
import websideCfg from '../config/webside.js';
import session from 'express-session';
import connectRedis from 'connect-redis';
import extend from 'extend';
import path from 'path';
import bodyParser from 'body-parser';
import multer from 'multer';
import cookie from 'cookie-parser';

let appPro = async() => {
        let app = express();

        // 设置模板目录
        app.set('views', path.join(__dirname, '../views'));
        // 设置模板引擎为 ejs
        app.set('view engine', 'ejs');

        // 设置静态文件目录 访问通过 [host]/...
        app.use(express.static(path.join(__dirname, '../public')));

        //设置网站常量 render优先级:res.render 传入的对象> res.locals 对象 > app.locals 对象
        app.locals.blog = {
            title: websideCfg.title,
            description: websideCfg.description,
            author: websideCfg.author,
        };
        //设置cookies 
        app.use(cookie());
        //设置session,将session存在 Redis 中
        var RedisStore = connectRedis(session);
        let rs = new RedisStore();
        app.use(session(extend(true, {}, serverCfg.session, rs)));

        //使用flash中间件用来显示通知
        app.use(flash());



        // 添加模板变量
        app.use(function(req, res, next) {
            res.locals.error = req.flash('error').toString();
            res.locals.success = req.flash('success').toString();
            next();
        });

        //限制上传文件大小
        app.use(bodyParser.json({ 'limit': '1000kb' })); // for parsing application/json
        app.use(bodyParser.urlencoded({ extended: true, 'limit': '1000kb' })); // for parsing application/x-www-form-urlencoded
        //app.use(multer()); // for parsing multipart/form-data

        //启动路由
        router(app);


        app.use(bodyParser.json());

        //启动服务 
        await runServer(app);


        return new Promise(resolve => resolve(app))
    }
    //如果是开发模式 不直接执行
if (!process.argv[1].endsWith('dev')) {
    appPro();
}
export default appPro