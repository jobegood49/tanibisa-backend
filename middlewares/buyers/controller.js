const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Buyer = require('./model')

const controller = {
  getBuyers: async (req, res, next) => {
    const allBuyers = await Buyer.find({}, { salt: 0, password: 0 })

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

    const createdBuyer = await Buyer.create(registerBuyer).then(
      createdBuyer => createdBuyer
    )

    res.send({
      message: 'New Buyer has been created',
      createdBuyer: {
        name: createdBuyer.name,
        email: createdBuyer.email
      }
    })
  },
  Login: async (req, res, next) => {
    const buyer = {
      email: req.body.email,
      password: req.body.password
    }

    const foundBuyer = await Buyer.findOne({ email: buyer.email })
    console.log(buyer)
    const comparePassword = await bcrypt.compare(
      buyer.password,
      foundBuyer.password
    )
    console.log(comparePassword)
    const payload = {
      sub: foundBuyer._id
    }

    const token = await jwt.sign(payload, process.env.SECRET)

    res.status(200).send({
      message: 'Succesfully log in',
      foundBuyer: {
        name: foundBuyer.name,
        email: foundBuyer.email
      },
      authenticated: comparePassword,
      token: token
    })
  },

  getBuyerProfile: async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    try {
      const decoded = await jwt.verify(token, process.env.SECRET)
      console.log(decoded)
      res.status(200).send({
        text: 'success',
        token: token
      })
    } catch (error) {
      res.status(404).send({
        text: 'error'
      })
    }
  },
  removeBuyerById: async (req, res, next) => {
    const removeBuyerBydId = await Buyer.findOneAndRemove({
      _id: req.params.id
    })
    res.send({
      message: 'one buyer has been deleted',
      buyer: removeBuyerBydId
    })
  }
}

module.exports = controller
