const { GraphQLString, GraphQLNonNull, GraphQLBoolean } = require("graphql");
const AuthType = require("../Schema/AuthType");
const User = require('../../model/User')
const Vendor = require('../../model/Vendor')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports ={
    createUser: {
        type: AuthType,
        args: {
            name: { type: GraphQLString },
            email: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) },
            cPassword: { type: new GraphQLNonNull(GraphQLString) },
            isUser: { type: GraphQLBoolean }
        },
        async resolve(parent, args){
            let { name, email, password, cPassword, isUser } = args
            try{
                if(password !== cPassword){
                    throw new Error('please confirm password ')
                }
                const user = await User.findOne({email})
                const vendor = await Vendor.findOne({email})
                let newUser;

                if(user || vendor){
                    throw new Error('This User already exist')
                }
                if(isUser){
                    newUser = new User({
                        name,
                        email,
                        password
                    })
                }
                else{
                    newUser = new Vendor({
                        name,
                        email,
                        password
                    })
                }
                let salt =  bcrypt.genSaltSync(10);
                let hash =  bcrypt.hashSync(password, salt);

                newUser.password = hash
                newUser = await newUser.save()

                let token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 2
                })
                if(isUser){
                    return{
                        token,
                        user: newUser._doc,
                        vendor: null
                    }
                }
                else{
                    return{
                        token,
                        user: null,
                        vendor: newUser._doc
                    }
                }
            }
            catch(err){
                throw err
            }
        }
    },
    forgetPassword: {
        type: GraphQLString,
        args: { email: { type: GraphQLString }},
        async resolve(parent, args){
            try{
                if(!args.email){
                    throw new Error('Please Enter your Email')
                }
                //generate a new password 
                let newPassword = Math.random() * 10000000
                newPassword = parseInt(newPassword)
                newPassword = String(newPassword)
    
                //hash the password 
                const salt =  bcrypt.genSaltSync(10);
                const hash =  bcrypt.hashSync(newPassword, salt);
    
                let user = await User.findOne({ email: args.email })
                if(!user){
                    throw new Error('This User Does not Exist')
                }
                let result = await User.updateOne({ email: args.email },{
                    $set: {
                        password: hash
                    }
                })
                return result.acknowledged && `this is your new password ${newPassword}`
            }
            catch(err){
                throw err
            }
        }
    }
}