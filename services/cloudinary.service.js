import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = async (file,folder,resourceType = "raw") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType,
        folder,
        use_filename: true,
        unique_filename: true,
        filename_override: file.originalname,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    const readableStream = Readable.from(file.buffer);

    readableStream.pipe(uploadStream);
  });
};