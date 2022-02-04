const { GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = require("graphql");
const User = require("../../model/User");
const ProductType = require("../Schema/ProductType");
const Product = require('../../model/Product')


module.exports={
    addToCart: {
        type: GraphQLString,
        args: {
            id: { type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(parent, args, req){
            if(!req.isAuth){
                throw new Error('Unauthorized')
            }
            const userId = req.user
            return User.updateOne({ _id: userId}, {
                $addToSet: {
                    cart: {
                        itemId: args.id
                    }
                }
            })
                .then(result => {
                    return result.acknowledged && `${args.id} successfully added`
                })
                .catch(err => {
                    throw err
                })
        }
    },
    removeFromCart: {
        type: GraphQLString,
        args: {
            id: { type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(p, a, req){
            if(!req.isAuth){
                throw new Error('Unauthorized')
            }
            const userId = req.user
            return User.updateOne({ _id: userId}, {
                $pull: {
                    cart: {
                        itemId: a.id 
                    }
                }
            })
                .then(result => {
                    return result.acknowledged && `${a.id } successfully removed`
                })
                .catch(err => {
                    throw err
                })
        }
    },
    saveItem: {
        type: GraphQLString,
        args: {
            id: { type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(parent, args, req){
            if(!req.isAuth){
                throw new Error('Unauthorized')
            }
            const userId = req.user
            return User.updateOne({ _id: userId}, {
                $addToSet: {
                    savedItem:  args.id
                }
            })
                .then(result => {
                    return result.acknowledged && `${args.id} successfully added`
                })
                .catch(err => {
                    throw err
                })
        }
    },
    unsaveItem: {
        type: GraphQLString,
        args: {
            id: { type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(p, a, req){
            if(!req.isAuth){
                throw new Error('Unauthorized')
            }
            const userId = req.user
            return User.updateOne({ _id: userId}, {
                $pull: {
                    savedItem: a.id 
                }
            })
                .then(result => {
                    return result.acknowledged && `${a.id } successfully removed`
                })
                .catch(err => {
                    throw err
                })
        }
    },
    rateProduct: {
        type: GraphQLString,
        args: {
            rate: { type: GraphQLInt }
        },
        resolve(parent, args, req){
            if(!req.isAuth){
                throw new Error('Unauthorized')
            }
            const userId = req.user
            return Product.updateOne({ _id: userId}, {
                $addToSet: {
                    rating:  {
                        rate: args.rate,
                        userId
                    }
                }
            })
                .then(result => {
                    return result.acknowledged && "successfully added"
                })
                .catch(err => {
                    throw err
                })
        }
    },
}