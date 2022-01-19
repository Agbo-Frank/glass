const { buildSchema } = require('graphql')

const schema = buildSchema(`
    type User{
        name: String
        _id: String
        email: String
        password: String
        cart: [Cart]
    }
    type Cart {
        itemId: String
        product: Product
        quantity: Int
    }
    type Rate{
        rate: Int,
        userId: String
    }
    type Product{
        _id: String
        name: String
        price: Int
        userId: String
        image: String
        rating:[Rate]
        date: String
    }
    type Auth{
        token: String
        user: User
    }
    type Message{
        message: String
    }
    type rootQuery{
        getUser: User
        getProducts: [Product]
        loginUser(email: String!, password: String!): Auth
        search(word: String!): [Product]
    }
    type rootMutation{
        createUser(name: String!, email: String!, password: String!): Auth
        addToCart(itemId: String!): Message
        removeFromCart(itemId: String!): Message
        forgetPassword(email: String!): Message
    }

    schema {
        query: rootQuery
        mutation: rootMutation
    }
`)

module.exports = schema