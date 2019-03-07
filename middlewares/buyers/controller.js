const User = require('./model')

const controller = {
  getBuyers: async (req, res, next) => {
    res.status(200).send({
      message: 'Buyers'
    })
  }
}

module.exports = controller
