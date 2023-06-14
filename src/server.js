import app from "./app.js";
import http from 'http';
import startHttpServer from './httpServer.js'
import startWebSocketServer from './webSocketServer.js'
import dotenv from 'dotenv'

const PORT = process.env.NODE_PORT||80;

const server = startHttpServer(PORT)
startWebSocketServer(server)