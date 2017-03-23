let showReqTimes = (req,res,next) =>{
	if(!req.session.reqTimes){
		req.session.reqTimes =1;
		res.send('你第1次访问了本网站');
	}else{
		req.session.reqTimes++;
		res.send('<p>你第'+req.session.reqTimes+'次访问了本网站</p>');
	}
	
	next();
}

export default showReqTimes