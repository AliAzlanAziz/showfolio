import path from 'path';
import { rimraf, rimrafSync } from 'rimraf';
import winston from 'winston';

const date = new Date().toLocaleDateString().replaceAll('/','_',);
const time = new Date().toLocaleTimeString().replaceAll(' ','-').replaceAll(':','_');
const filename = `${date}_${time}.txt`
console.log('filename: '+filename)

rimrafSync(path.join(__dirname, "..", "logs"))

const mainLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format(info => {
      info.level = info.level.toUpperCase()
      return info;
    })(),
    winston.format.printf(
      (log) => {
        return `${log.level} >> MSG: ${log.message}, FILE: ${log.service}`;
      }
    )
  ),
  transports: [
    new (winston.transports.Console)({
      format: winston.format.colorize({all: true})
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '..', `/logs/${filename}`)
    }),
  ],
});

export const serviceLogger = (service: string) => mainLogger.child({ service: service })