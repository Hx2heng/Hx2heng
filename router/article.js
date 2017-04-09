import express from 'express'
import marked from 'marked'
import fs from 'fs'
import ArticlesModel from './models/articles'
let router = express.Router();


router.get('/:id', (req, res) => {
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
        return res.status(404).end(err);
    });

})
router.get('/docs', (req, res) => {
    let content = req.query.content;
    fs.readFile('public/content/' + content + '.md', (err, data) => {
        if (err) {
            res.render('content', {
                title: content,
                content: marked('`err`')
            });
        } else {
            res.render('content', {
                title: content,
                content: marked(data.toString())
            });
        }
    })
})

export default router