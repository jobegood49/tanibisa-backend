const express = require('express')
const router = express.Router()

const controller = require('./controller')

router.get('/', controller.getBuyers)

module.exports = router
