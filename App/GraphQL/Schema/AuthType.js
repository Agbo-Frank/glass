const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require('graphql')
const UserType = require('./UserType')
const VendorType = require('./VendorType')

const AuthType = new GraphQLObjectType({
    name: "Auth",
    fields: () => ({
        token: { type: GraphQLString },
        user: { type: UserType },
        vendor: { type: VendorType }
    })
})

module.exports = AuthType