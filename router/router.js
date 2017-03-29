import index from './index.js'
import test from './test.js'
import posts from './posts.js'
import artList from './artList.js'
import article from './article.js'
import admin from './admin.js'
import signin from './signin.js'

let router = (app) => {

    app.use('/', index); //首页

    app.use('/test', test);

    app.use('/article', article);

    app.use('/artList', artList);

    app.use('/posts', posts); //

    app.use('/admin', admin); //用户后台
    app.use('/signin', signin); //用户登录
}

export default router