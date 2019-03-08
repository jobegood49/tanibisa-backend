const jwt = require("jsonwebtoken")

const controller = {
  /////////////////////////////////
  isAuthenticated: async (req, res, next) => {
    req.token = "token"

    next()
  }
}

module.exports = controller
