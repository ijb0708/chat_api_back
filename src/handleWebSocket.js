import logger from "./utils/logger.js"
import { blobToString } from './globals/parser.js'

const clients = new Set();

export const handleWebSocket = (ws, req) => {
    
    logger.info("connect user!")

    clients.add(ws);

    // 클라이언트로부터 메시지 수신 이벤트 처리
    ws.on('message', async (message) => {
        console.log('Received message:', message);
        logger.info(message)

        // const str = await blobToString(message.text())
        clients.forEach((client) => {
            // if (client.readyState !== WebSocket.OPEN) {

                client.send("test");
            // }
        });
    });

    ws.on('close', () => {
        clients.delete(ws);
        logger.info("close")
    })

}