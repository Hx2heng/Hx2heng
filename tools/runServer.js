import serverCfg from '../config/default.js'

let runServer = (app)=>{
	return new Promise(resolve=>{
		app.listen(serverCfg.port,()=>{
			console.log('server running at http://localhost:3000');
			resolve();
		})
	}) 
}
export default runServer