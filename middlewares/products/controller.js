const jwt = require('jsonwebtoken')

const Product = require('./model')
const Commodity = require('../commodities/model')
const Farmer = require('../farmers/model')
const SEED_DATA = require('./seed')

const controller = {
  seedProducts: async (req, res, next) => {
    const commodities = await Commodity.find().populate({
      path: 'products',
      populate: {
        path: 'farmer_id commodity_id',
        select: '-salt -password'
      }
    })

    const products = commodities.forEach(async commodity => {
      // SEED_DATA is around 3 objects
      await SEED_DATA.forEach(async product => {
        const newProduct = await Product.create({
          ...product, // just a price key
          farmer_id: req.decoded.sub,
          commodity_id: commodity._id
        })
        await Farmer.findOneAndUpdate(
          { _id: newProduct.farmer_id },
          { $push: { products: newProduct._id } }
        )
        await Commodity.findOneAndUpdate(
          { _id: newProduct.commodity_id },
          { $push: { products: newProduct._id } }
        )
      })
    })

    res.status(200).send({
      message: 'Seed initial products:',
      products: products
    })
  },

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
    const data = {
      farmer_id: req.decoded.sub,
      commodity_id: req.body.commodity_id,
      price: req.body.price
    }

    // 1. create new product first
    const newProduct = await Product.create(data)

    // 2. push new product into farmer's products
    const newFarmer = await Farmer.findOneAndUpdate(
      { _id: data.farmer_id },
      { $push: { products: newProduct._id } },
      {
        fields: { salt: 0, password: 0 }, // exclude password in farmer
        new: true
      }
    )

    // 3. push new product into commodity's products
    const newCommodity = await Commodity.findOneAndUpdate(
      { _id: data.commodity_id },
      { $push: { products: newProduct._id } },
      {
        new: true
      }
    )

    res.status(200).send({
      message: 'Created new product',
      newProduct: newProduct,
      newFarmer: newFarmer,
      newCommodity: newCommodity
    })
  },

  ///////////////////////////////////////////////////////////////////////////////
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
