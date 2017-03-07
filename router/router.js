import index from './index.js'
import test from './test.js'
import posts from './posts.js'
let router = (app)=>{

	app.use('/',index)

	app.use('/test',test)

	app.use('/posts',posts)
	
}

export default router