const OrderType = require("../Schema/OrderType");
const Order = require('../../model/Order')
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean } = require('graphql')


module.exports = {
    createOrder: {
        type: OrderType,
        args: {
            vendorId: { type: GraphQLString },
            productId: { type: GraphQLString },
            reference: { type: GraphQLString },
            price: { type: GraphQLInt},
        },
        async resolve(_, args, req){
            let { vendorId, productId, price, reference } = args
            if(!req.isAuth){
                throw new Error('Unauthorized')
            }
            const userId = req.user
            try{
                let newOrder = await Order.create({
                    userId,
                    vendorId, 
                    productId,
                    reference,
                    price
                })
                return newOrder._doc
            }
            catch(err){
                throw err
            }
        }
    }
}