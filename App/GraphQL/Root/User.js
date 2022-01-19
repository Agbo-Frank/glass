const User = require('../../model/User')
const Product = require('../../model/Product')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    createUser: async ({name, email, password}) => {
        try{
            if(!email || !password){
                throw new Error('Please Enter All Fields')
            }
            const user = await User.findOne({email})
            if(user){
                throw new Error('This User already exist')
            }
            let newUser = new User({
                name,
                email,
                password
            })
            let salt =  bcrypt.genSaltSync(10);
            let hash =  bcrypt.hashSync(password, salt);

            newUser.password = hash
            newUser = await newUser.save()

            let token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 2
            })
            return{
                token,
                user: newUser._doc
            }
        }
        catch(err){
            throw err
        }
    },
    loginUser: async ({email, password}) => {
        try{
            if(!email || !password){
                throw new Error('Please Enter All Fields')
            }
            let user = await User.findOne({email})
            if(!user){
                throw new Error('User does not exist please signUp')
            }

            let match = await bcrypt.compare(password, user._doc.password)

            if(!match){
                throw new Error('incorrect Password')
            }
            let token = jwt.sign({id: user.id},  process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 2
            })
            return{
                token,
                user: user._doc
            }
        }
        catch(err){
            throw err
        }
    },
    getUser: async (arg, req) => {
        try{
            if(!req.isAuth){
                throw new Error('Unauthorized')
            }
            const userId = req.user
            let user = await User.findOne({_id: userId})
            if(!user){
                throw new Error('User not found')
            }
            return {
                ...user._doc,
                cart:() => {
                    return user._doc.cart.map(cart => {
                        return {
                            ...cart._doc,
                            product: () => {
                            return Product.findOne({_id: cart._doc.itemId})
                                    .then(product => {
                                        return product
                                    })
                                    .catch(err=> {
                                        throw err
                                    })
                            } 
                        }
                    })
                }
            }
        }
        catch(err){
            throw err
        }
    },
    addToCart: ({itemId}, req) => {
        if(!req.isAuth){
            throw new Error('Unauthorized')
        }
        const userId = req.user
        return User.updateOne({ _id: userId}, {
            $addToSet: {
                cart: {
                    itemId 
                }
            }
        })
            .then(result => {
                return result.acknowledged && {message: "successfully added"}
            })
            .catch(err => {
                throw err
            })
    },
    removeFromCart: ({itemId}, req) => {
        if(!req.isAuth){
            throw new Error('Unauthorized')
        }
        const userId = req.user
        return User.updateOne({ _id: userId}, {
            $pull: {
                cart: {
                    itemId 
                }
            }
        })
            .then(result => {
                return result.acknowledged && {message: `${itemId} successfully removed`}
            })
            .catch(err => {
                throw err
            })
    },
    forgetPassword: async ({ email }) => {
        try{
            if(!email){
                throw new Error('Please Enter your Email')
            }
            //generate a new password 
            let newPassword = Math.random() * 10000000
            newPassword = parseInt(newPassword)
            newPassword = String(newPassword)

            //hash the password 
            const salt =  bcrypt.genSaltSync(10);
            const hash =  bcrypt.hashSync(newPassword, salt);

            let user = await User.findOne({ email })
            if(!user){
                throw new Error('This User Does not Exist')
            }
            let result = await User.updateOne({ email },{
                $set: {
                    password: hash
                }
            })
            return result.acknowledged && {message: `this is your new password ${newPassword}`}
        }
        catch(err){
            throw err
        }
    }
}