import express from 'express'

let router = express.Router();

router.use((req, res, next) => {
    next();
})
router.get('/', (req, res) => {
    let data = global.testData;
    res.render('index', { title: 'web demo', articles: data });
})
export default router