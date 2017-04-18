import serverCfg from '../config/default.js'
let runServer = (app) => {
    return new Promise(resolve => {
        var server = app.listen(serverCfg.port, () => {
            var host = server.address().address;
            var port = server.address().port;
            console.log('server running at http://%s:%s', host, port);

            resolve();
        })
    })
}
export default runServer