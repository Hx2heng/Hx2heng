import express from 'express'
import marked from 'marked'
import fs from 'fs'
let router = express.Router();


router.get('/', (req, res) => {
    let data = global.testData;
    res.render('content',{
        title:data[req.query.id].title+'Web Demo',
        content : marked(data[req.query.id].description.toString())
    })
})
router.get('/docs', (req, res) => {
    let content = req.query.content;
    fs.readFile('public/content/'+content+'.md', (err, data) => {
        if (err) {
            res.render('content', {
                title:content,
                content: marked('`err`')
            });
        } else {
            res.render('content', {
                title:content,
                content: marked(data.toString())
            });
        }
    })
})
export default router