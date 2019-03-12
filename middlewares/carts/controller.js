const Cart = require('./model')

const controller = {
  getCarts: async (req, res, next) => {
    const cart = await Cart.find()

    res.status(200).send({
      message: 'cart list :',
      cart: cart
    })
  },
  /////////////////////////////////////////////////////////////////////////////////////////
  createNewCart: async (req, res, next) => {
    const newCart = {
      buyer_id: req.body.buyer_id,
      products: [
        { productId: req.body.product_id },
        { quantity: req.body.quantity }
      ],
      image: req.body.image,
      tags: req.body.tags
    }
    const result = await Cart.create(newCart)

    res.send({
      message: 'Created new cart',
      result: result
    })
  },
  /////////////////////////////////////////////////////////////////////////////////////////
  getOneCartById: async (req, res, next) => {
    const cart = await Cart.findOne({ id: Number(req.params.id) })

    res.status(200).send({
      message: 'Get one cart by id',
      cart: cart
    })
  },
  //////////////////////////////////////////////////////////
  addProduct: async (req, res, next) => {
    const cart = await Cart.findOneAndUpdate({ product_id })

    res.status(200).send({
      message: 'Add your product',
      cart: cart
    })
  }
}

module.exports = controller
