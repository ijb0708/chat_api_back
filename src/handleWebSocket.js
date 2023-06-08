import logger from "./utils/logger.js"

export const handleWebSocket = (ws, req) => {
    
    clients.add(ws)
    logger.info("connect user!")

    logger.debug("sess:::")
    logger.debug( req.session.user )

    // 클라이언트로부터 메시지 수신 이벤트 처리
    ws.on('message', (message) => {
        console.log('Received message:', message);
    });

    ws.on('close', () => {
      
        clients.delete(ws)
        logger.info("close")
    })

}