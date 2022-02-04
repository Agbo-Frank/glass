const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLBoolean, GraphQLInt } = require('graphql')
const Product = require('../../model/Product')
const ProductType = require('./ProductType')

const VendorType = new GraphQLObjectType({
    name: "Vendor",
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        product: {
            type: new GraphQLList(ProductType),
            resolve(parent){
                return Product.find({ vendorId: parent._id})
            }
        }
    }),
})

module.exports = VendorType