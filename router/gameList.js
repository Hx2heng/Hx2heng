import express from 'express'
import marked from 'marked'
import fs from 'fs'
import GamesModel from './models/games'
let router = express.Router();


router.get('/', (req, res) => {
    GamesModel.findAllGames().then((data) => {
        data.map((game) => {
            game.content = marked(game.content.toString());
        })
        res.render('gameList', { games: data });
    })


})


export default router