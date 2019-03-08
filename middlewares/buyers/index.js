const express = require('express')
const router = express.Router()

const controller = require('./controller')

router.get('/', controller.getBuyers)

router.post('/register', controller.Register)

router.post('/login', controller.Login)

router.get('/profile', controller.getBuyerProfile)

router.get('/:id', controller.getBuyerById)

module.exports = router
