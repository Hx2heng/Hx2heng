import express from 'express'
import ArticlesModel from './models/articles'
import marked from 'marked'
let router = express.Router();

router.use((req, res, next) => {
    next();
})
router.get('/', (req, res) => {
    ArticlesModel.findAllArticles().then((articles) => {
        articles.map((article) => {
            article.content = marked(article.content.toString());
        })


        res.render('index', { articles: articles });
    });

})
export default router