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
export default router