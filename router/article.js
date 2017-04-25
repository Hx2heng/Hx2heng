import express from 'express'
import marked from 'marked'
import fs from 'fs'
import ArticlesModel from './models/articles'
let router = express.Router();


router.get('/', (req, res) => {
    let id = req.query.id;
    if (!id) {
        req.flash('error', '参数错误');
        return res.redirect('back');
    }

    ArticlesModel.findArticleById(id).then((article) => {
        article.content = marked(article.content);
        res.render('content', {
            title: article.title,
            type: 'article',
            data: article,
            isConcrete: true
        })
    }).catch((err) => {
        req.flash('error', err);
        return res.status(404).render('404');
    });

})
router.get('/docs', (req, res) => {
    let content = req.query.content;
    fs.readFile('public/content/' + content + '.md', (err, data) => {
        if (err) {
            res.status(404);
        } else {
            res.render('staticContent', {
                title: content,
                content: marked(data.toString())
            });
        }
    })
})

export default router