import mongoose, { connect } from "mongoose";

//function to connect to database
const connectDB = async () => {
    try{
        const conn = await connect(process.env.MONGO_URI as string)

        console.log(`MongoDB connected at host: ${conn.connection.host}`)
    } catch(err) {
        console.log(err)
        process.exit(1)
    }
}

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected!');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected!');
});

// Function to gracefully close the Mongoose connection
const gracefulExit = async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed through app termination');
    process.exit(0);
};

const signals = ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'];

signals.forEach(signal => {
    process.on(signal, gracefulExit);
});

export default connectDB