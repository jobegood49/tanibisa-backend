const User = require('./model')

const controller = {
  getUsers: async (req, res, next) => {
    res.status(200).send({
      message: 'Users'
    })
  }
}

module.exports = controller
