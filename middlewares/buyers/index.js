const express = require('express')
const router = express.Router()

const controller = require('./controller')

router.get('/', controller.getBuyers)
router.get('/:id', controller.getBuyerById)
router.post('/register', controller.Register)

module.exports = router
