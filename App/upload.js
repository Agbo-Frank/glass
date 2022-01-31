const { Router } = require('express')
const Product = require('./model/Product')
const cloudinary = require('./utils/cloudinary')
const upload = require('./utils/multer')
const fs = require('fs')

const router = Router()

router.post('/product', async (req, res) => {
    try{
        // const userId = req.user
        const {name, price, images} = req.body
        console.log(images)
        const uploader = async (path) => await cloudinary.uploads(path);
        let urls = [];

        function upload(image){
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload(image, (result) =>{
                    if(result){
                        resolve(result.public_id)
                    }
                    else{
                        reject("sorry couldn't uplod")
                    }
                })
            })
        }
        if(images.length === 3){
        for(let i = 0; i < images.length; i++){
            // const { path } = image
            upload(images[i])
                .then(id => urls.push(id))
                .catch(err => console.log(err))
            // fs.unlinkSync(image)
        }


        console.log(urls)}
        // await images.forEach(async (image) => {
        //     return new Promise(resolve => {
        //         cloudinary.uploader.upload(image, (result) => {
        //             resolve(urls.push(result.public_id))
        //         })
        //     }) 
        // })
        // console.log(urls)
        // console.log(arrImages)
        // let newImage = await cloudinary.uploader.upload(image)
        // let product = new Product({
        //     name,
        //     price,
        //     userId,
        //     image: newImage.public_id
        // })
        // product = await product.save()
        // res.status(200).json({
        //     product
        // })
    }
    catch (err){
        res.status(400).json({
            err
        })
    }
})

module.exports = router