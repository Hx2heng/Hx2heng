import express from 'express'

let router = express.Router();

router.use((req,res,next)=>{
	
	next();
})

export default router