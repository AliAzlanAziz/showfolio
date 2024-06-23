import express, { Express, NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB  from './config/db';
import userRoutes from './routes/user';
import workInfoRoutes from './routes/workInfo';

dotenv.config({ path: __dirname + '/config/config.env' })

connectDB()

const app: Express = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());

if(process.env.NODE_ENV == 'DEV' || process.env.NODE_ENV == 'PROD') {
    app.use(morgan('dev'));
}

app.get('/', (req: Request, res: Response, next: NextFunction) => res.status(200).json({ message: 'Server running at Railway!'} ))

app.use('/user', userRoutes)
app.use('/workInfo', workInfoRoutes)

app.listen(process.env.PORT, () =>
    console.log(`Server ready at http://localhost:${process.env.PORT}`)
)

export default app;