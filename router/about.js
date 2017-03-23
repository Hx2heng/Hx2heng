import express from 'express'
import marked from 'marked'
import fs from 'fs'
let router = express.Router();


router.get('/', (req, res) => {
    fs.readFile('public/content/about.md', (err, data) => {
        if (err) {
            res.render('content', {
                content: marked('`err`')
            });
        } else {
            res.render('content', {
                content: marked(data.toString())
            });
        }
    })
})
export default router