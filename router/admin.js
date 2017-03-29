import express from 'express'
import { checkLogin, checkNotLogin } from './middlewares/check.js'
let router = express.Router();

router.use((req, res, next) => {
    next();
})
router.get('/', checkLogin, (req, res) => {
    if (req.flash('info') == '未登录') {
        res.redirect('/signin');
    }
    res.render('admin', { messages: req.flash('info') });
})

router.post('/', (req, res, net) => {
    var name = req.fields.name;
    var password = req.fields.password;
    console.log(name, password);
})
export default router