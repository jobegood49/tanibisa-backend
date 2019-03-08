const express = require('express')
const router = express.Router()

const controller = require('./controller')

router.get('/', controller.getBuyers)
router.get('/:id', controller.getBuyerById)
router.post('/register', controller.Register)
router.post('/login', controller.Login)

module.exports = router
