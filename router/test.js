import express from 'express'
import testMiddlewares from '../middlewares/test.js'
import {checkLogin,checkNotLogin} from '../middlewares/check.js'

let router = express.Router();

router.get('/',checkLogin,testMiddlewares,(req,res)=>{
	//res.send('test');
})
router.get('/demo',(req,res)=>{
	res.send('test demo')
})
export default router