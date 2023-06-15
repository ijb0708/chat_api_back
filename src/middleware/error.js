import logger from "../utils/logger/index.js"

export const notFound = (req, res, next) => {
    try {
        res.status(404).json({
            message: "해당하는 페이지가 없습니다."
        })
    }catch(err) {
        next(err)
    }
}

export const error = (err, req, res, next) => {

    logger.error(err); // 에러 로깅

    // 클라이언트에게 적절한 에러 응답 전송
    res.status(500).json({
        message: "오류입니다."
    })
}