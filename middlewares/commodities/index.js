const express = require('express')
const router = express.Router()

const controller = require('./controller')

router.get('/', controller.getCommodities)
router.get('/seed', controller.getSeed)
router.post('/', controller.createNewCommodity)
router.get('/:id', controller.getOneCommodityById)

module.exports = router
