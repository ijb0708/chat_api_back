import app from "./app.js";
import http from 'http';
import path from 'path';
import WebSocket, { WebSocketServer } from "ws";
import dotenv from 'dotenv'
import { handleWebSocket } from './handleWebSocket.js'

//import { server } from './config'

const __dirname = path.resolve();

const server = http.createServer(app);
const wss = new WebSocketServer({ server })

const env = process.env.NODE_ENV || 'dev';
const PORT = process.env.NODE_PORT || 8080

dotenv.config({ path: '.env.local' });

wss.on("connection", handleWebSocket)

server.listen(PORT, () => {

    console.log('server running ' + PORT);
});