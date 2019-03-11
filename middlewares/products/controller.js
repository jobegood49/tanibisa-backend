const Product = require('./model')
const jwt = require('jsonwebtoken')

const controller = {
  //////////////////////////////////////////////////////////////////////////////
  getProducts: async (req, res, next) => {
    const products = await Product.find()
      .populate('farmer_id', { salt: 0, password: 0, email: 0 })
      .populate('commodity_id')

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
  },

  getOneProductById: async (req, res, next) => {
    const product = await Product.findOne({
      id: Number(req.params.id)
    })
      .populate('farmer_id', { salt: 0, password: 0, email: 0 })
      .populate('commodity_id')

    if (product) {
      res.status(200).send({
        message: 'Get one product by id',
        product: product
      })
    } else {
      res.status(404).send({
        message: 'Product not found!'
      })
    }
  }
}

module.exports = controller
