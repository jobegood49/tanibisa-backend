const express = require('express')
const router = express.Router()

const controller = require('./controller')

router.get('/', controller.getCarts)
router.post('/', controller.createNewCart)
router.get('/:id', controller.getOneCartById)
// router.put('/:id/add-product', controller.)
// router.put
// router.put

module.exports = router
