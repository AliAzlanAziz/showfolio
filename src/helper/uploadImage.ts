import { cloudinary } from "../config/cloudinary";

export const uploadBase64Image = async (base64Image: string, folder: string, prefix: string) => {
  const size = getFileSize(base64Image);

  if(size > 6.25){
    throw new Error("File Size Must be less than 6MB!");
  }

  const ext = base64Image.split(";base64,")[0].replace(/^data:image\//, '');

  if (ext === 'jpeg' || ext === 'jpg' || ext === 'png'){
    const uploadedRes = await cloudinary.uploader.upload(base64Image, {
      filename_override: `${prefix}-${folder}.${ext}`,
      folder: folder,
      overwrite: true,
      use_filename: true,
      unique_filename: false
    });

    return uploadedRes.secure_url;
  }else{
    throw new Error("Base64 data not valid! Only jpg, jpeg, png images are allowed.");
  }
}

const getFileSize = (base64Image: string): number => {
  const truncateBase64Meta = base64Image.substring(base64Image.indexOf(',') + 1); 
  const decoded = atob(truncateBase64Meta);
  return decoded.length / 1e+6;
}
