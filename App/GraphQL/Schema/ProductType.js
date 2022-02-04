const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql')

const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        vendorId: { type: GraphQLString },
        image: { type: new GraphQLList(GraphQLString) },
        description: { type: GraphQLString },
        price: { type: GraphQLInt }
    })
})

module.exports = ProductType