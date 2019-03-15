const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Farmer = require('./model')

const controller = {
  seedFarmers: async (req, res, next) => {
    const result = await Farmers.create(SEED_DATA)

    res.status(200).send({
      message: 'Seed initial Farmers:',
      result
    })
  },
  /////////////////////////////////
  getFarmers: async (req, res, next) => {
    const allFarmers = await Farmer.find({}, { salt: 0, password: 0 })

    res.status(200).send({
      message: 'List of all farmers',
      farmers: allFarmers
    })
  },

  /////////////////////////////////
  getFarmerById: async (req, res, next) => {
    const farmer = await Farmer.findOne(
      { id: Number(req.params.id) },
      { salt: 0, password: 0 }
    )

    res.send({
      farmer: farmer
    })
  },

  /////////////////////////////////
  Register: async (req, res, next) => {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    const registerFarmer = {
      ...req.body,
      salt,
      password
    }

    const createdFarmer = await Farmer.create(registerFarmer).then(
      createdFarmer => createdFarmer
    )

    res.send({
      message: 'New Farmer has been created',
      createdFarmer
    })
  },

  /////////////////////////////////
  Login: async (req, res, next) => {
    const farmer = {
      email: req.body.email,
      password: req.body.password
    }

    const foundFarmer = await Farmer.findOne({ email: farmer.email })

    if (foundFarmer) {
      const comparePassword = await bcrypt.compare(
        farmer.password,
        foundFarmer.password
      )

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
    } else {
      res.status(404).send({
        message: 'User is not found'
      })
    }
  },

  /////////////////////////////////
  getFarmerProfile: async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    try {
      const decoded = await jwt.verify(token, process.env.SECRET)

      const foundFarmer = await Farmer.findById(decoded.sub, {
        salt: 0,
        password: 0
      })

      res.status(200).send({
        message: 'farmer profile',
        farmer: foundFarmer
      })
    } catch (error) {
      res.status(404).send({
        text: 'error'
      })
    }
  },

  /////////////////////////////////
  removeFarmerById: async (req, res, next) => {
    const farmer = await Farmer.findOneAndRemove(
      {
        id: Number(req.params.id)
      },
      { salt: 0, password: 0 }
    )

    if (farmer) {
      res.send({
        message: 'One farmer has been deleted',
        farmer: farmer
      })
    } else {
      res.send({
        message: 'No farmer found with that id'
      })
    }
  },
  updateOneFarmerById: async (req, res, next) => {
    const farmerFound = await Farmer.findOne({ id: Number(req.params.id) })

    // the farmer has to be found first
    if (farmerFound) {
      // create updatedfarmer from all the keys in request body
      const updatedFarmer = { ...req.body }

      const farmer = await Farmer.findOneAndUpdate(
        { id: Number(req.params.id) },
        { $set: updatedFarmer }, // set with new data
        {
          new: true, // show the latest update
          select: '-password -salt'
        }
      )

      res.send({
        message: 'Update one farmer by id',
        farmer: farmer
      })
    } else {
      res.send({
        message: 'Farmer is not found'
      })
    }
  }
}

module.exports = controller
