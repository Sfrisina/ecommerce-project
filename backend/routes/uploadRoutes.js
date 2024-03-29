// import express from 'express'
// import multer from 'multer'
// import path from 'path'
// const router = express.Router()

// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename(req, file, cb) {
//         cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// function checkFileType(file, cb){
//     const filetypes = /jpeg|jpg|png/
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//     const mimetype = filetypes.test(file.mimetype)

//     if (extname && mimetype) {
//         return cb(null, true)
//     }else{
//         cb('Images Only')
//     }
// }

// const upload = multer({
//     storage, 
//     fileFilter: function(req, file, cb){
//         checkFileType(file, cb)
//     }
// })

// router.post('/', upload.single('image'), (req, res) => {
//     res.send(`/${req.file.path}`)
// })

import express  from 'express'
import multer from 'multer'
import cloudinaryES6 from 'cloudinary'
const cloudinary = cloudinaryES6.v2
import {CloudinaryStorage} from 'multer-storage-cloudinary'
const router = express.Router()


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Product Images', 
        allowed_formats: ['jpeg', 'png', 'jpg']
    }
})

const upload = multer({ storage })

router.post(
    '/', 
    upload.single('image'),
    (req, res) => {
        const uploadImageURL = req.file.path
        res.send(uploadImageURL)
    }
)

export default router