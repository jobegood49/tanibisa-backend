const express = require('express')
const router = express.Router()

const controller = require('./controller')

router.post('/seed', controller.seedCommodities)
router.post('/', controller.createNewCommodity)

router.get('/', controller.getCommodities)
router.get('/:id', controller.getOneCommodityById)

module.exports = router
