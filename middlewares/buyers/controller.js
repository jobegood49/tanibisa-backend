const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Buyer = require('./model')

const controller = {
  getBuyers: async (req, res, next) => {
    const allBuyers = await Buyer.find()

    res.status(200).send({
      message: 'List of all buyers',
      buyers: allBuyers
    })
  },
  getBuyerById: async (req, res, next) => {
    const buyerBydId = await Buyer.findOne({ _id: req.params.id })
    res.send({
      buyer: buyerBydId
    })
  },
  Register: async (req, res, next) => {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    const registerBuyer = {
      name: req.body.name,
      email: req.body.email,
      salt: salt,
      password: password,
      image: req.body.image
    }

    res.send({
      message: 'created new buyer',
      register: registerBuyer
    })
  }
  // Login: async (req, res, next) => {
  //   const buyer = []
  // }
}

module.exports = controller
