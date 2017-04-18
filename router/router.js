import index from './index.js'
import test from './test.js'
import posts from './posts.js'
import artList from './artList.js'
import gameList from './gameList.js'
import article from './article.js'
import game from './game.js'
import admin from './admin.js'
import tool from './tool.js'
import toolList from './toolList.js'
import signin from './signin.js'
import comment from './comment.js'

let router = (app) => {
    app.use('/', index); //首页

    app.use('/test', test);

    app.use('/article', article);
    app.use('/game', game);
    app.use('/tool', tool);

    app.use('/artList', artList);
    app.use('/gameList', gameList);
    app.use('/toolList', toolList);

    app.use('/posts', posts); //

    app.use('/admin', admin); //用户后台
    app.use('/signin', signin); //用户登录

    app.use('/comment', comment); //评论框

    app.use(function(req, res) {
        if (!res.headersSent) {
            res.status(404).render('404');
        }
    });

    app.get('*.bundle.js', function(req, res, next) {
        console.log(req.url);
        req.url = req.url + '.gz';
        res.set('Content-Encoding', 'gzip');
        next();
    });

}

export default router