import express from 'express'
import ArticlesModel from './models/articles'
import GamesModel from './models/games'
import marked from 'marked'
import limiter from 'express-limiter'
let router = express.Router();

router.use((req, res, next) => {
    next();
})
router.get('/', (req, res) => {
    Promise.all([ArticlesModel.findAllArticles('all', 5), GamesModel.findAllGames('all', 4)]).then((data) => {
        data[0].map((article) => {
            article.content = marked(article.content.toString());
        })
        res.render('index', { articles: data[0], games: data[1], isConcrete: false });
    })
})
router.get('/getArticlesByLimter', (req, res) => {
    let limit = req.query.limit - 0,
        skip = req.query.skip - 0;
    ArticlesModel.findAllArticles('all', limit, skip).then((data) => {
        data.map((article) => {
            article.content = marked(article.content.toString());
        })
        return res.json(data)
    })
})
export default router