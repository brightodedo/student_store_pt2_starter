const express = require("express")
const User = require("../models/user")
const router = express.Router()
const { createUserJwt } = require('../utils/tokens')
const {requireAuthenticatedUser} = require('../middleware/security')
const Order = require('../models/order')

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.login(req.body)
    const token = createUserJwt(user)
    return res.status(200).json({ user, token })
  } catch (err) {
    next(err)
  }
})

router.post("/register", async (req, res, next) => {
  try {
    const user = await User.register({ ...req.body, isAdmin: false })
    const token = createUserJwt(user)
    return res.status(201).json({ user,token })
  } catch (err) {
    next(err)
  }
})

router.get('/me', requireAuthenticatedUser, async (req, res, next) => {
  try{
      const {email} = res.locals.user
      const user = await User.makePublicUser(await User.fetchUserByEmail(email))
      const orders = Order.listOrdersForUser(user)
      return res.status(200).json({user, orders})
  }
  catch(err){
      next(err)
  }
})

module.exports = router
