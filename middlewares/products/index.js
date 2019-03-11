const express = require('express')
const router = express.Router()

const controller = require('./controller')
const auth = require('../auth/controller')

router.get('/', controller.getProducts)
router.get('/:id', controller.getOneProductById)
router.post('/', auth.isAuthenticated, controller.createNewProduct)

module.exports = router
