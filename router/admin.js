import express from 'express'
import { checkLogin, checkNotLogin } from './middlewares/check.js'
import AdminsModel from './models/admins'
import ArticlesModel from './models/articles'

let router = express.Router();

router.use((req, res, next) => {
    next();
})
router.get('/', checkLogin, (req, res) => {
    res.render('admin', { type: 'banner' });
})
router.get('/admin-article', checkLogin, (req, res) => {
    res.render('admin', { type: 'admin-article' });
})


//根据当前用户用户查询所有文章
router.get('/getAllArticles', checkLogin, (req, res) => {
    ArticlesModel.findAllArticle(req.session.admin.name).then((articles) => {
        return res.json(articles);
    });

})

//发表文章页
router.post('/createArticle', (req, res) => {
    var title = req.body.articleTitle;
    var content = req.body.articleContent;
    var tags = ['js', 'css', 'h5'];
    // 校验参数
    try {
        if (!title.length) {
            throw new Error('请填写标题');
        }
        if (!content.length) {
            throw new Error('请填写内容');
        }
        if (!req.session.admin) {
            throw new Error('用户未登录');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('back');
    }
    var article = {
        title: req.body.articleTitle,
        content: req.body.articleContent,
        tags: ['js', 'css', 'h5'],
        id: 2,
        author: req.session.admin.name,
    };

    ArticlesModel.createArticles(article).then((message) => {
        req.flash('success', message);
        return res.redirect('back');
    })


    console.log(article);
})




export default router