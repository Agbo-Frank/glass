const { GraphQLObjectType } = require('graphql')
const order = require('./order')
const product = require('./product')
const user = require('./user')

const rootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: {
        ...user,
        ...product,
        ...order
    }
})
module.exports = rootMutation