const express = require('express')
const router = express.Router()

const controller = require('./controller')
const auth = require('../auth/controller')

router.get('/', auth.isAuthenticated, controller.getCarts)
router.post('/', auth.isAuthenticated, controller.createNewCart)
router.put('/:id/add-product', auth.isAuthenticated, controller.addProduct)
router.put('/:id/add-address', auth.isAuthenticated, controller.addAddress)
router.get('/:id', auth.isAuthenticated, controller.getOneCartById)

module.exports = router
