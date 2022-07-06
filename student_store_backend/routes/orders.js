const express  = require('express')
const router = express.Router()
const Order = require('../models/order')
const {requireAuthenticatedUser} = require('../middleware/security')


router.get('/', requireAuthenticatedUser, (req,res,next) =>{
    try{
        const {user} = res.locals
        const orders = Order.listOrdersForUser(user)
        return res.status(200).json({orders})
    }
    catch(err){
        next(err)
    }
})

router.post('/', requireAuthenticatedUser,async (req, res, next) => {
    try{
        console.log("----------------------------------------------------------------------------------------------------")
        const {user} = res.locals
        const orders = await Order.createOrder(user, req.body)
        console.log(orders)
        return res.status(201).json({order : orders})
    }
    catch(err){
        next(err)
    }
})

module.exports = router