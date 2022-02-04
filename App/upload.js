const { Router } = require('express')
const Product = require('./model/Product')
const cloudinary = require('./utils/cloudinary')
const { auth } = require('./utils/authenticate')

const router = Router()

router.post('/product', auth, async (req, res) => {
    try{
        const vendorId = req.user
        const {name, price, images, description} = req.body

        function upload(image){
            return new Promise((resolve, reject) => {
                return cloudinary.uploader.upload(image, (err, result) =>{
                    if(result){
                        resolve(result.public_id)
                    }
                    else{
                        reject(err)
                    }
                })
            })
        }
        function storeImage(files){
            let arrImage = [];
            return new Promise((resolve, reject) => {
                for(let i = 0; i < files.length; i++){
                    upload(files[i])
                        .then(id => {
                            arrImage.push(id)
                            if(arrImage.length === files.length){
                                resolve(arrImage)
                            }
                        })
                        .catch(err =>{ reject(err)})
                }
            })
        }
        let arrImage = await storeImage(images)
        
        let product = new Product({
            name,
            price,
            vendorId,
            image: arrImage,
            description
        })
        product = await product.save()
        console.log(product)
        res.status(200).json({
            product
        })
    }
    catch (err){
        res.status(400).json({
            err
        })
    }
})

module.exports = router