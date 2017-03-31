import express from 'express'
import ArticlesModel from './models/articles'

let router = express.Router();

router.use((req, res, next) => {
    next();
})
router.get('/', (req, res) => {
    ArticlesModel.findAllArticles().then((articles) => {
        let data = articles;
        res.render('index', { articles: data });
    });

})
export default router