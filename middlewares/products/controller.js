const Products = require('./model')
const jwt = require('jsonwebtoken')

const controller = {
  /////////////////////////////////
  getProducts: async (req, res, next) => {
    const allProducts = await Products.find()

    res.status(200).send({
      message: 'List of all products',
      products: allProducts
    })
  },
  //////////////////////////////////////
  createNewProducts: async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    const decodedFarmer = await jwt.verify(token, process.env.SECRET)

    if (decodedFarmer.sub) {
      const newProduct = {
        product_name: req.body.Product_name,
        farmer_id: req.body.farmer_id,
        commodity_id: req.body.commodity_id,
        price: req.body.price,
        description: req.body.description
      }

      const result = await Products.create(newProduct)
      res.status(200).send({
        message: 'New product has been created!',
        products: newProduct
      })
    } else {
      res.status(401).json({})
    }
  }
}

module.exports = controller
