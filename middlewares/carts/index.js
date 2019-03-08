const express = require("express")
const router = express.Router()

const controller = require("./controller")

router.get("/", controller.getCarts)

module.exports = router
