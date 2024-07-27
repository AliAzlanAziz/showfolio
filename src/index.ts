import express, { Express, NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB  from './config/db';
import waitListRoutes from './routes/waitList';
import userRoutes from './routes/user';
import workInfoRoutes from './routes/workInfo';
import projectRoutes from './routes/project';
import awardRoutes from './routes/award';
import viewRoutes from './routes/view';
import subscriptionRoutes from './routes/subscription';
import stripeRoutes from './routes/stripe';
import connectCloudinary from './config/cloudinary';
import { insertDummyData } from './dump/insert';
import winston from 'winston';
import fs from 'fs';
import https from 'https';
import http from 'http';

// TODO: SETUP WINSTON
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(), 
    winston.format.json()
  ),
  transports: [
    new (winston.transports.Console)({
      format: winston.format.colorize({all: true})
    })
  ],
});

dotenv.config({ path: __dirname + '/config/config.env' })

connectDB()//.then(async () => await insertDummyData()); // uncomment code to insert dummyUsers
connectCloudinary()

const app: Express = express()
app.use('/stripe', express.raw({type: 'application/json'}), stripeRoutes)
app.use(express.json({ limit: '15Mb' }));

// Request logger
// TODO: Separate it to some folder
app.use((req, res, next)=>{
  logger.info(`${res.statusCode} ${req.method} ${req.originalUrl}`);
  
  return next();
})
app.use(cors());

app.get('/', (req: Request, res: Response, next: NextFunction) => res.status(200).json({ message: 'Server running!'} ))

app.use('/waitList', waitListRoutes)
app.use('/user', userRoutes)
app.use('/workInfo', workInfoRoutes)
app.use('/project', projectRoutes)
app.use('/award', awardRoutes)
app.use('/view', viewRoutes)
app.use('/subscription', subscriptionRoutes)

const privateKey  = fs.readFileSync(`${__dirname}/config/privKey.pem`, 'utf8');
const certificate = fs.readFileSync(`${__dirname}/config/cert.pem`, 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

const HTTP_PORT = process.env.PORT1 || 8080
const HTTPS_PORT = process.env.PORT2 || 8081

httpServer.listen(HTTP_PORT, () => {
  console.log(`Server ready at http://localhost:${HTTP_PORT}`)
});

httpsServer.listen(HTTPS_PORT, () => {
  console.log(`Server ready at https://localhost:${HTTPS_PORT}`)
});


export default app;