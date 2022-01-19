const { Router } = require('express')
const Product = require('./model/Product')
const cloudinary = require('./utils/cloudinary')

const router = Router()

router.post('/product', async (req, res) => {
    try{
        const userId = req.user
        const {name, price, image} = req.body
    
        let newImage = await cloudinary.uploader.upload(image)
        let product = new Product({
            name,
            price,
            userId,
            image: newImage.public_id
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