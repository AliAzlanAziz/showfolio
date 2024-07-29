import path from 'path';
import { rimraf } from 'rimraf';
import winston from 'winston';

const date = new Date().toLocaleDateString().replaceAll('/','_',);
const time = new Date().toLocaleTimeString().replaceAll(' ','-').replaceAll(':','_');
const filename = `${date}_${time}.txt`
console.log('filename: '+filename)

rimraf(path.join(__dirname, "..", "logs")).then().catch()

const mainLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(), 
    winston.format.json()
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