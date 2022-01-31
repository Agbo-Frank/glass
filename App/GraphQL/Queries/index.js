const { GraphQLObjectType } = require('graphql')
const product = require('./product')
const user = require('./user')

const rootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        ...user,
        ...product
    }
})
module.exports = rootQuery