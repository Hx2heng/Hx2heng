import express from 'express'
import marked from 'marked'

let router = express.Router();


router.get('/', (req, res) => {
    res.render('content', {
        content: marked('`hxz`')
    });
})
export default router