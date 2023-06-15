import winstonDaily from 'winston-daily-rotate-file';

const logFileSetting = new winstonDaily({
    level: 'info',
    datePattern: 'YYYY-MM-DD',
    dirname: "./logs",
    filename: `info_%DATE%.log`,
    maxFiles: 30,  // 로그파일 저장기간
    zippedArchive: true, 
})

export default logFileSetting