const express = require('express')
const router = express.Router()

const controller = require('./controller')
const auth = require('../auth/controller')

router.get('/', controller.getFarmers)

router.post('/register', controller.Register)

router.post('/login', controller.Login)

router.get('/profile', auth.isAuthenticated, controller.getFarmerProfile)

router.get('/:id', controller.getFarmerById)

router.delete('/:id', auth.isAuthenticated, controller.removeFarmerById)

router.put('/:id', auth.isAuthenticated, controller.updateOneFarmerById)

module.exports = router
