import logger from "./utils/logger/index.js"
import { getTokenData } from "./global/author.js"
import { getTokenFromQueryString, jsonToString, jsonToObject } from "./global/parser.js"
import { WebSocketServer } from 'ws'

let wss;

export default (server) => {

    wss = new WebSocketServer({ server })
    wss.on("connection", (webSocket, request) => {
        
        if(webSocket.readyState === webSocket.OPEN){ // 연결 여부 체크
            try{
                const token = getTokenFromQueryString(request.url)
                if(!token) {
                    throw new Error('토큰값이 없습니다.')
                }
        
                const tokenData = getTokenData(token)
                if(!tokenData.room_seq
                    ||!tokenData.user_id) {
                    throw new Error('적절하지않은 토큰값입니다.')
                }
                webSocket.use_room_seq = tokenData.room_seq
                webSocket.user_id = tokenData.user_id
                webSocket.user_name = tokenData.user_name
        
            }catch(err) {
                logger.error(err)
                webSocket.close();
            }
        }
    
        // 클라이언트로부터 메시지 수신 이벤트 처리
        webSocket.on('message', (message) => {
            console.log('Received message:', message.toString());
            logger.info(message.toString())

            sendTextToRoom(webSocket, message.toString())
        })
    
        // 4) 에러 처러
        webSocket.on('error', (error)=>{
            logger.err(`클라이언트[${ip}] 연결 에러발생 : ${error}`)
        })
    
        webSocket.on('close', () => {
            // clients.delete(ws);
            logger.info(`클라이언트[${webSocket.user_id||""}] 연결 종료`)
        })
    
    })
}

const sendErrToUser = (webSocket, text) => {

    const sendData = {
        type: "err",
        content: text
    }

    webSocket.send(jsonToString(sendData))
}

const sendTextToRoom = (webSocket, text) => {

    const sendData = {
        type: "text",
        target: "room",
        sendUser: webSocket.user_name,
        content: text
    }

    wss.clients.forEach((client) => {
        if (client !== webSocket && client.readyState === webSocket.OPEN && client.use_room_seq == webSocket.use_room_seq) {
            client.send(jsonToString(sendData));
        }
    });
}

const sendTextToAll = (webSocket, text) => {

    const sendData = {
        type: "text",
        target: "All",
        content: text
    }

    wss.clients.forEach((client) => {
        if (client.readyState === webSocket.OPEN) {
            client.send(jsonToString(sendData));
        }
    });
}

const sendTextToUser = (webSocket, text) => {

    const sendData = {
        type: "text",
        target: "All",
        content: text
    }

    webSocket.send(jsonToString(sendData))
}