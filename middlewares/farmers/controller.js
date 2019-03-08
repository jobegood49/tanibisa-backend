const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Farmer = require('./model')

const controller = {
  getFarmers: async (req, res, next) => {
    const allFarmers = await Farmer.find({}, { salt: 0, password: 0 })

    res.status(200).send({
      message: 'List of all Farmers',
      Farmers: allFarmers
    })
  },
  getFarmerById: async (req, res, next) => {
    const FarmerBydId = await Farmer.findOne({ _id: req.params.id })
    res.send({
      Farmer: FarmerBydId
    })
  },
  Register: async (req, res, next) => {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    const registerFarmer = {
      name: req.body.name,
      email: req.body.email,
      salt: salt,
      password: password,
      image: req.body.image,
      location: req.body.location
    }

    const createdFarmer = await Farmer.create(registerFarmer).then(
      createdFarmer => createdFarmer
    )

    res.send({
      message: 'New Farmer has been created',
      createdFarmer: {
        name: createdFarmer.name,
        email: createdFarmer.email,
        location: createdFarmer.location
      }
    })
  },
  Login: async (req, res, next) => {
    const Farmer = {
      email: req.body.email,
      password: req.body.password
    }

    const foundFarmer = await Farmer.findOne({ email: Farmer.email })
    console.log(Farmer)
    const comparePassword = await bcrypt.compare(
      Farmer.password,
      foundFarmer.password
    )
    console.log(comparePassword)
    const payload = {
      sub: foundFarmer._id
    }

    const token = await jwt.sign(payload, process.env.SECRET)

    res.status(200).send({
      message: 'Succesfully log in',
      foundFarmer: {
        name: foundFarmer.name,
        email: foundFarmer.email
      },
      authenticated: comparePassword,
      token: token
    })
  },

  getFarmerProfile: async (req, res, next) => {
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
  removeFarmerById: async (req, res, next) => {
    const removeFarmerBydId = await Farmer.findOneAndRemove({
      _id: req.params.id
    })
    res.send({
      message: 'one Farmer has been deleted',
      Farmer: removeFarmerBydId
    })
  }
}

module.exports = controller
