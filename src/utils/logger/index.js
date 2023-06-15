import {createLogger, format, transports} from 'winston';
import logFileSetting from './logFileSetting.js';

export default createLogger({
    format : format.combine(
        format.timestamp({
            format : 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(
            (info) => info.timestamp + ' [' + info.level + '] ' + info.message
        )
    ),
    transports : [
        // info 레벨 로그를 저장할 파일 설정
        logFileSetting,
        new transports.Console({
            handleExceptions : true
        })
    ]
});