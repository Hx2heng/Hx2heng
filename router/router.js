import index from './index.js'
import test from './test.js'
import posts from './posts.js'
import about from './about.js'

let router = (app) => {

    app.use('/', index)

    app.use('/test', test)

    app.use('/about', about)

    app.use('/posts', posts)
}

export default router