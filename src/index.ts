import express, { Request, Response } from 'express';
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
import { serviceLogger } from './config/logger';
dotenv.config({ path: __dirname + '/config/config.env' })

connectDB()//.then(async () => await insertDummyData()); // uncomment code to insert dummyUsers
connectCloudinary()

const app = express()
app.use('/stripe', express.raw({type: 'application/json'}), stripeRoutes)
app.use(express.json({ limit: '15Mb' }));

const logger = serviceLogger('index.js');

app.use((req, res, next)=>{
  if(process.env.NODE_ENV=='DEV'){
    logger.info(`${res.statusCode} ${req.method} ${req.originalUrl}`);
  }
  
  return next();
})

app.use(cors());

app.get('/', (req: Request, res: Response) => res.status(200).json({ message: 'Server running!'} ))

// app.use('/waitList', waitListRoutes)
app.use('/user', userRoutes)
app.use('/workInfo', workInfoRoutes)
app.use('/project', projectRoutes)
app.use('/award', awardRoutes)
app.use('/view', viewRoutes)
app.use('/subscription', subscriptionRoutes)

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  logger.info(`Server ready at http://localhost:${PORT}`)
})

export default app;