const { GraphQLSchema } = require('graphql')
const rootQuery = require('../Queries')
const rootMutation = require('../Mutation')

const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
})

module.exports = schema