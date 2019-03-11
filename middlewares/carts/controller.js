const Cart = require('./model')

const controller = {
  getCarts: async (req, res, next) => {
    const cart = await Cart.find()

    res.status(200).send({
      message: 'cart list :',
      cart: cart
    })
  }
}

module.exports = controller
