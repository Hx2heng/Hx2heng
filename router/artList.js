import express from 'express'
import marked from 'marked'
import fs from 'fs'
let router = express.Router();


router.get('/', (req, res) => {
    let data = global.testData;
    res.render('artList',{title:'文章列表-WebDemo',articles:data})
})
export default router