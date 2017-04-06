import express from 'express'
import marked from 'marked'
import fs from 'fs'
import GamesModel from './models/games'
let router = express.Router();


router.get('/:id', (req, res) => {
    let id = req.query.id;
    if (!id) {
        req.flash('error', '参数错误');
        return res.redirect('back');
    }
    GamesModel.findGameById(id).then((game) => {
        game.content = marked(game.content);
        res.render('content', {
            type: 'game',
            data: game,
            isConcrete: true
        })
    }).catch((err) => {
        return res.status(404).end(err);
    });

})


export default router