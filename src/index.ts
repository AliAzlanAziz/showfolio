import express, { Express, NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB  from './config/db';
import userRoutes from './routes/user';
import workInfoRoutes from './routes/workInfo';
import projectRoutes from './routes/project';
import awardRoutes from './routes/award';
import viewRoutes from './routes/view';
import subscriptionRoutes from './routes/subscription';
import stripeRoutes from './routes/stripe';
import connectCloudinary from './config/cloudinary';

dotenv.config({ path: __dirname + '/config/config.env' })

connectDB()
connectCloudinary()

const app: Express = express()
app.use('/stripe', express.raw({type: 'application/json'}), stripeRoutes)
app.use(express.json({ limit: '50Mb' }));

app.use(cors());

if(process.env.NODE_ENV == 'DEV' || process.env.NODE_ENV == 'PROD') {
    app.use(morgan('dev'));
}

app.get('/', (req: Request, res: Response, next: NextFunction) => res.status(200).json({ message: 'Server running at Railway!'} ))

app.use('/user', userRoutes)
app.use('/workInfo', workInfoRoutes)
app.use('/project', projectRoutes)
app.use('/award', awardRoutes)
app.use('/view', viewRoutes)
app.use('/subscription', subscriptionRoutes)

app.listen(process.env.PORT, () =>
    console.log(`Server ready at http://localhost:${process.env.PORT}`)
)

export default app;