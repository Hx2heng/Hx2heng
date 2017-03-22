import express from 'express'
import testMiddlewares from './middlewares/test.js'
import { checkLogin, checkNotLogin } from './middlewares/check.js'
import Mongolass from 'mongolass'
let router = express.Router();

router.get('/', testMiddlewares, (req, res) => {
    //res.send('test');
    const mongolass = new Mongolass('mongodb://localhost:27017/myblog');
    const User = mongolass.model('User', {
        name: { type: 'string' },
        age: { type: 'number' }
    });
    const test = mongolass.model('test', {
        name: { type: 'string' },
        age: { type: 'number' }
    });
    test
        .insertOne({ name: 'huangxinzheng', age: 25 })
        .exec()
        .then(console.log('insert success'))
        .catch(function(e) {
            console.error(e);
            console.error(e.stack);
        });
})
router.get('/demo', (req, res) => {
    res.send('test demo')
})
export default router