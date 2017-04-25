import express from 'express'
import marked from 'marked'
import fs from 'fs'
import GamesModel from './models/games'
let router = express.Router();


router.get('/', (req, res) => {
    let id = req.query.id;
    if (!id) {
        req.flash('error', '参数错误');
        return res.redirect('back');
    }
    GamesModel.findGameById(id).then((game) => {
        game.content = marked(game.content);
        res.render('content', {
            title: game.title,
            type: 'game',
            data: game,
            isConcrete: true
        })
    }).catch((err) => {
        req.flash('error', err);
        return res.status(404).render('404');
    });

})


export default router