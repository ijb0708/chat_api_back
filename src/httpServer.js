import app from "./app.js"
import http from 'http'

export default (port) => {

    const server = http.createServer(app);
    server.listen(port, () => {
        console.log('server running ' + port);
    });

    return server
}