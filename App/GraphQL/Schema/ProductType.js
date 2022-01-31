const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql')

const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        userId: { type: GraphQLString },
        image: { type: GraphQLString },
        price: { type: GraphQLInt }
    })
})

module.exports = ProductType