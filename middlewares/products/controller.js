const Product = require('./model')
const jwt = require('jsonwebtoken')

const controller = {
  //////////////////////////////////////////////////////////////////////////////
  getProducts: async (req, res, next) => {
    const products = await Product.find()

    res.status(200).send({
      message: 'List of all products',
      products: products
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  createNewProduct: async (req, res, next) => {
    const newProduct = {
      farmer_id: req.body.farmer_id,
      commodity_id: req.body.commodity_id,
      price: req.body.price
    }

    const result = await Product.create(newProduct)

    res.status(200).send({
      message: 'Created new product',
      result: result
    })
  }
}

module.exports = controller
