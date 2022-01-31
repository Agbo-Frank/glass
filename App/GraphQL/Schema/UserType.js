const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')
const Product = require('../../model/Product')
const ProductType = require('./ProductType')

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        cart: { type: new GraphQLList(new GraphQLObjectType({
            name: "cart",
            fields: () => ({
                _id: { type: GraphQLString },
                itemId: { type: GraphQLString },
                product: { 
                    type: ProductType,
                    resolve(parent, args){
                        return Product.findOne({ _id: parent.itemId})
                    } 
                },
                quantity: { type: GraphQLInt }
            })
        }))},
        savedItems: {
            type: new GraphQLList(ProductType),
            resolve(parent, args){
                return Product.find({ _id: parent.savedItem })
            }
        },
        product: {
            type: new GraphQLList(ProductType),
            resolve(parent){
                return Product.find({ userId: parent._id})
            }
        }
    }),
})

module.exports = UserType