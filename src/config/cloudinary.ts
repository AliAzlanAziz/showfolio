import { v2 as cloudinary } from 'cloudinary';
import { serviceLogger } from './logger';

const logger = serviceLogger('cloudinary.js');

//function to connect to database
const connectCloudinary = async () => {
    try{
        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });

    } catch(error) {
        logger.error(error)
        process.exit(1)
    }
}

export {
    cloudinary
};

export default connectCloudinary;