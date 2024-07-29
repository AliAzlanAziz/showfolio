import mongoose, { connect } from "mongoose";
import { serviceLogger } from './logger';

const logger = serviceLogger('db.js');

//function to connect to database
const connectDB = async () => {
    try{
        const conn = await connect(process.env.MONGO_URI as string)

        logger.info(`MongoDB connected at host: ${conn.connection.host}`)
    } catch(error) {
        logger.error(JSON.stringify(error))
        process.exit(1)
    }
}

mongoose.connection.on('connected', () => {
    logger.info('Mongoose connected!');
});

mongoose.connection.on('error', (err) => {
    logger.error('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose disconnected!');
});

// Function to gracefully close the Mongoose connection
const gracefulExit = async () => {
    await mongoose.connection.close();
    logger.info('Mongoose connection closed through app termination');
    process.exit(0);
};

const signals = ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'];

signals.forEach(signal => {
    process.on(signal, gracefulExit);
});

export default connectDB