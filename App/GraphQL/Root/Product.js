const Product = require('../../model/Product')
const cloudinary = require('../../utils/cloudinary')

module.exports = {
    getProducts: async () => {
        try{
            let products = await Product.find({})
            return products.map(product => {
                return product._doc
            })
        }
        catch(err){
            throw err
        }
    },
    search: ({ word }) => {
        return Product.find(
            { "name": { $regex: word, $options: 'i'  } }
        )
        .then(products => {
            return products.map(product => {
                return product._doc
            })
            
        })
        .catch(err => {
            throw err
        })
    }
}