import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";

const checkFileType = function (file: Express.Multer.File, cb: FileFilterCallback) {
  const fileTypes = /jpeg|jpg|png/; 

  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb(new Error('Only jpeg, jpg and png images can by uploaded'));
  }
};

const storageEngine = multer.diskStorage({
  destination: "./src/uploadedImages",
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const extension = file.mimetype.split('/')[1];
    cb(null, `${req.context.user._id}-${((new Date()).toUTCString().getTime())}----.${extension}`);
  }
});

export const multerImageUploader = multer({
  storage: storageEngine,
  limits: { fileSize: 1024 },
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    checkFileType(file, cb);
  }
});