const UserType = require("../Schema/UserType");
const AuthType = require("../Schema/AuthType");
const { GraphQLString, GraphQLNonNull } = require('graphql')
const User = require('../../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const authenticate = require('../../utils/authenticate')

module.exports = {
    getUser:{
        type: UserType,
        resolve(parent, args, req){
            if(!req.isAuth){
                throw new Error('Unauthorized')
            }
            const userId = req.user
            return User.findOne({ _id: userId})
        }
    },
    loginUser: {
        type: AuthType,
        args: {
            email: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) }
        },
        async resolve(parent, args){
            let { email, password } = args
            try {
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
            } catch (error) {
                throw error
            }
        }
    }
}