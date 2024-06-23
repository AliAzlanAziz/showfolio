import { v2 as cloudinary } from 'cloudinary';

//function to connect to database
const connectCloudinary = async () => {
    try{
        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });

    } catch(err) {
        console.log(err)
        process.exit(1)
    }
}

export {
    cloudinary
};

export default connectCloudinary;