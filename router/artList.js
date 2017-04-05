import express from 'express'
import marked from 'marked'
import fs from 'fs'
import ArticlesModel from './models/articles'
import AdminsModel from './models/admins'
let router = express.Router();


router.get('/', (req, res) => {
    let type = req.query.type;
    if (type) {
        Promise.all([ArticlesModel.findAllArticlesByTags(type), AdminsModel.findAllArticleTagsByAdmin()]).then((data) => {
            data[0].map((article) => {
                article.content = marked(article.content.toString());
            })
            res.render('artList', { articles: data[0], tags: data[1], activeTag: type });
        })
    } else {
        Promise.all([ArticlesModel.findAllArticles(), AdminsModel.findAllArticleTagsByAdmin()]).then((data) => {
            data[0].map((article) => {
                article.content = marked(article.content.toString());
            })
            res.render('artList', { articles: data[0], tags: data[1], activeTag: 'all' });
        })
    }

})


export default router