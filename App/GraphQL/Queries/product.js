const ProductType = require("../Schema/ProductType");
const { GraphQLString, GraphQLList } = require('graphql');
const Product = require("../../model/Product");


module.exports = {
    getProduct: {
        type: ProductType,
        args: { id: { type: GraphQLString }},
        resolve(parent, args){
            return Product.findOne({ _id: args.id})
        }
    },
    getProducts: {
        type: new GraphQLList(ProductType),
        resolve(p, a){
            return Product.find({ })
        }
    },
    search: {
        type: new GraphQLList(ProductType),
        args: { word: { type: GraphQLString}},
        resolve(p, a){
            return Product.find({ "name": { $regex: a.word, $options: 'i'  } })
        }
    }
}