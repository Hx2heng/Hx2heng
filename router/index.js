import express from 'express'
import ArticlesModel from './models/articles'
import GamesModel from './models/games'
import marked from 'marked'
let router = express.Router();

router.use((req, res, next) => {
    next();
})
router.get('/', (req, res) => {
    Promise.all([ArticlesModel.findAllArticles(), GamesModel.findAllGames()]).then((data) => {
        data[0].map((article) => {
            article.content = marked(article.content.toString());
        })
        res.render('index', { articles: data[0], games: data[1], isConcrete: false });
    })

})
export default router