const multer=require('multer')
const path=require('path')

const storage=multer.diskStorage({
  destination:'./upload/images',
  filename:(req,file,cb)=>{
    cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload=multer({storage})

exports.uploadMiddleware = upload.single('product')

exports.uploadImage=(req,res)=>{
  res.json({
    success:1,
    image_url:`http://localhost:4000/images/${req.file.filename}`
  })
}
