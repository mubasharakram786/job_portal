import multer from 'multer'

const storage = multer.memoryStorage()


const allowedTypesForResume = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/msword", // .doc
];

    const allowedTypesForImages = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
    ]
export const  resumeUpload = multer({
    storage,
    limits:{
        fileSize:5*1024*1024
    },
    fileFilter:(req,file,cb)=>{
        if(allowedTypesForResume.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb(new Error(
          "Only PDF, DOC and DOCX files are allowed."
        ))
        }
    }
})
export const imageUpload = multer({
    storage,
    limits:{
        fileSize:2*1024*1024
    },
    fileFilter:(req,file,cb)=>{
        if(allowedTypesForImages.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb(new Error(
          "Only jpeg, png and webp files are allowed."
        ))
        }
    }
})
