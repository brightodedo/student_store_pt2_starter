const {SECRET_KEY} = require('../config')
const jwt = require('jsonwebtoken')

const generateToken = (data) => 
    jwt.sign(data, SECRET_KEY, {expiresIn : "10h"})


const createUserJwt = (user) => {
    const payload = {
        email : user.email,
        admin : user.isAdmin
    }

    return generateToken(payload)
}

const validateToken = (token) => {
    try{
        const decoded = jwt.verify(token, SECRET_KEY)
        return decoded
    }
    catch(err){
        return {}
    }
}

module.exports = {
    createUserJwt,
    generateToken,
    validateToken,
}