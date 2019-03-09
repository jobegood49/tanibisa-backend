const Products = require('./model')

const controller = {
  /////////////////////////////////
  getProducts: async (req, res, next) => {
    const allProducts = await Products.find()

    res.status(200).send({
      message: 'List of all products',
      products: allProducts
    })
  }
}

module.exports = controller
