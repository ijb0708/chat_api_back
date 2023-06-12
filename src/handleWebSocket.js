import logger from "./utils/logger.js"
import { getTokenData } from "./globals/authorization.js"
// const clients = new Set();

const getTokenFromQueryString = (queryString) => {
    const tokenMatch = queryString.match(/[?&]token=([^&]+)/);
    if (tokenMatch) {
      return tokenMatch[1];
    } else {
      return null;
    }
  }

export const handleWebSocket = (ws, req) => {
    
    let tokenData
    try{

        console.log(req.url)

        const token = getTokenFromQueryString(req.url)
        if(!token) {
            throw new Error('토큰값이 없습니다.')
        }
        
        tokenData = getTokenData(token)
    }catch(err) {
        logger.error(err)
    }

    console.log(tokenData)
    
    // logger.info("connect user!")
    // // logger.info(QueryString)
    // console.log(QueryString)

    // logger.info(req.headers.authorization)

    // clients.add(ws);
    // const data = getToken(token)
    // logger.info(token)
    // console.log(token)

    // 클라이언트로부터 메시지 수신 이벤트 처리
    ws.on('message', async (message) => {
        console.log('Received message:', message.toString());
        logger.info(message.toString())

        // const str = await blobToString(message.text())
        clients.forEach((client) => {
            // if (client.readyState !== WebSocket.OPEN) {

            client.send(message.toString());
            // }
        });
    });

    ws.on('close', () => {
        clients.delete(ws);
        logger.info("close")
    })

}