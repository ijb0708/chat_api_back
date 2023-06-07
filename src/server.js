import app from "./app.js";
import http from 'http';
import path from 'path';

//import { server } from './config'

const __dirname = path.resolve();

const server = http.createServer(app);

const env = process.env.NODE_ENV || 'dev';
const PORT = process.env.NODE_PORT || 80

server.listen(PORT, () => {

    console.log('server running ' + PORT);
});