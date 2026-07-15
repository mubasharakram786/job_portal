import multer from 'multer'

const storage = multer.memoryStorage()


const allowedTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/msword", // .doc
];

const upload = multer({
    storage,
    limits:{
        fileSize:5*1024*1024
    },
    fileFilter:(req,file,cb)=>{
        if(allowedTypes.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb(new Error(
          "Only PDF, DOC and DOCX files are allowed."
        ))
        }
    }
})

export default upload