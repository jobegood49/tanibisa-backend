const express = require('express')
const router = express.Router()

const controller = require('./controller')

router.get('/', controller.getFarmers)

router.post('/register', controller.Register)

router.post('/login', controller.Login)

router.get('/profile', controller.getFarmerProfile)

router.get('/:id', controller.getFarmerById)

router.delete('/:id', controller.removeFarmerById)

module.exports = router
