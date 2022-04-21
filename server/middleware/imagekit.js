const axios = require('axios')
const FormData = require('form-data')

const ImageKit = (req,res,next) =>{
    const bodyFormData = new FormData();
    let decodePrivateKey = Buffer.from(`${process.env.PRIVAT_KEY_KIT}:`, "utf8").toString('base64')
    if (req.file) {
        let type = req.file.originalname.split('.')
        if (type[1] === 'jpeg' || type[1] === 'jpg' || type[1] === 'png') {
            if (req.file.size < 500000) {
                bodyFormData.append('fileName', req.file.originalname)
                bodyFormData.append('file', req.file.buffer.toString('base64'))
            axios({
                method: 'POST',
                    url: 'https://upload.imagekit.io/api/v1/files/upload',
                    headers : {
                        Authorization: `Basic ${decodePrivateKey}`,
                        ...bodyFormData.getHeaders()
                    },
                    data: bodyFormData
                })
                .then(response =>{
                    req.body.imageUrl = response.data.url
                    next()
                })
                .catch(err =>{
                    next(err)
                })
            } else{
                next({
                    name : "Invalid Image",
                    message : "Maximum size of uploaded image is 255kb"
                })
            }
        } else {
            next({
                name : "Invalid Image",
                message : "Uploaded file is not a valid image. Only JPG, JPEG and PNG files are allowed"
            })
        } 
    } else if (req.body.imgUrl === "undefined") {
        next({
            name : "Required Image",
            message : "Image is required"
        })
    } else if (req.body.imgUrl) {
        next()
    } else {
        next({
            name : "Required Image",
            message : "Image is required"
        })
    }
}
  
module.exports=ImageKit