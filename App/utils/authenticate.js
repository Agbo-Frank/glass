var jwt = require('jsonwebtoken')
require('dotenv').config()

function auth (req, res, next){
    var token = req.header('x-auth-token')
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if(decoded){
            req.user = decoded.id
            next()
        }
        else{
            res.status(400).json({err})
        }
      });
}

async function authenticate (req, res, next){
    
    const token = req.headers.authtoken
    if(!token){
        req.isAuth = false
        return next()
    }
    if(token === '' || token === null){
        req.isAuth = false
        return next()
    }
    try{
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
        if(!decodedToken){
            req.isAuth = false
            return next()
        }
        if(decodedToken){
            req.isAuth = true
            req.user = decodedToken.id
            return next()
        }
    }
    catch(err){
        res.status(400).json({err})
    }
}

module.exports = {authenticate, auth}