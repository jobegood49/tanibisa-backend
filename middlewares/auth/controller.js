const jwt = require('jsonwebtoken')

const controller = {
  /////////////////////////////////
  isAuthenticated: async (req, res, next) => {
    if (req.headers.authorization) {
      const token = await req.headers.authorization.split(' ')[1]
      const decoded = await jwt.verify(token, process.env.SECRET)

      req.token = token // ey12345
      req.decoded = decoded // { object }

      if (token && decoded) {
        next()
      } else {
        res.send({
          message: 'You are not authenticated!'
        })
      }
    } else {
      res.send({
        message: 'Token does not exist!'
      })
    }
  }
}

module.exports = controller
