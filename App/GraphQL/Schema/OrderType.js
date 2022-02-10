const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean } = require('graphql')
const Product = require('../../model/Product')
const User = require('../../model/User')
const UserType = require('./UserType')
const ProductType = require('./ProductType')

const OrderType = new GraphQLObjectType({
    name: "Order",
    fields: () => ({
        userId: { type: GraphQLString },
        vendorId: { type: GraphQLString },
        productId: { type: GraphQLString },
        reference: { type: GraphQLString },
        price: { type: GraphQLInt},
        user: {
            type: UserType,
            resolve(parent){
                return User.findOne({ _id: parent.userId})
            }
        },
        product: {
            type: ProductType,
            resolve(parent){
                return Product.findOne({ _id: parent.productId})
            }
        }
    })
})

module.exports = OrderType