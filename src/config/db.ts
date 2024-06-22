import { connect } from "mongoose";

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

export default connectDB