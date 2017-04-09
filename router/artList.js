import express from 'express'
import marked from 'marked'
import fs from 'fs'
import ArticlesModel from './models/articles'
import AdminsModel from './models/admins'
let router = express.Router();


router.get('/', (req, res) => {
    let type = req.query.type;
    if (type) {
        Promise.all([ArticlesModel.findAllArticlesByTags(type, 10), AdminsModel.findAllArticleTagsByAdmin()]).then((data) => {
            data[0].map((article) => {
                article.content = marked(article.content.toString());
            })
            res.render('artList', { articles: data[0], tags: data[1], activeTag: type });
        })
    } else {
        Promise.all([ArticlesModel.findAllArticles('all', 10), AdminsModel.findAllArticleTagsByAdmin()]).then((data) => {
            data[0].map((article) => {
                article.content = marked(article.content.toString());
            })
            res.render('artList', { articles: data[0], tags: data[1], activeTag: 'all' });
        })
    }

})
router.get('/getArticlesByLimter', (req, res) => {
    let type = req.query.type,
        limit = req.query.limit - 0,
        skip = req.query.skip - 0;
    if (type) {
        ArticlesModel.findAllArticlesByTags(type, limit, skip).then((data) => {
            data.map((article) => {
                article.content = marked(article.content.toString());
            })
            return res.json(data)
        })
    } else {
        ArticlesModel.findAllArticles('all', limit, skip).then((data) => {
            data.map((article) => {
                article.content = marked(article.content.toString());
            })
            return res.json(data)
        })
    }

})

export default router