const express = require('express')
const router = express.Router()

const controller = require('./controller')
const auth = require('../auth/controller')

router.get('/', controller.getBuyers)

router.post('/register', controller.Register)

router.post('/login', controller.Login)

router.get('/profile', auth.isAuthenticated, controller.getBuyerProfile)

router.get('/:id', controller.getBuyerById)

router.delete('/:id', auth.isAuthenticated, controller.removeBuyerById)

router.put('/:id', auth.isAuthenticated, controller.updateOneBuyerById)

module.exports = router
