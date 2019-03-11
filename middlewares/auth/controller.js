const jwt = require('jsonwebtoken')

const controller = {
  /////////////////////////////////
  isAuthenticated: async (req, res, next) => {
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
  }
}

module.exports = controller
