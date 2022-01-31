const { GraphQLObjectType } = require('graphql')
const product = require('./product')
const user = require('./user')

const rootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: {
        ...user,
        ...product
    }
})
module.exports = rootMutation