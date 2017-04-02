import express from 'express'
import marked from 'marked'
import fs from 'fs'
import ArticlesModel from './models/articles'
let router = express.Router();


router.get('/', (req, res) => {
    ArticlesModel.findAllArticles().then((articles) => {
        articles.map((article) => {
            article.content = marked(article.content.toString());
        })


        res.render('artList', { articles: articles });
    });

})
export default router