import express from 'express'

let router = express.Router();

router.use((req, res, next) =>{
  next();
})
router.get('/',(req,res)=>{
	res.send('index');
})
export default router