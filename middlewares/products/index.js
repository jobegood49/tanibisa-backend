const express = require('express')
const router = express.Router()

const controller = require('./controller')

router.get('/', controller.getProducts)
// router.post('/', controller.createNewProducts)

module.exports = router
