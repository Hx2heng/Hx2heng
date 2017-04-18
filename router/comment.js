import express from 'express'
let router = express.Router();


router.get('/', (req, res) => {
    let sid = req.query.sid;
    if (!sid) {
        res.status(404).end();
    }
    res.render('components/comment', {
        sid: sid
    })

})


export default router