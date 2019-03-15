const Cart = require('./model')
const Commodity = require('../commodities/model')

const controller = {
  //////////////////////////////////////////////////////////////////////////////
  getCarts: async (req, res, next) => {
    const carts = await Cart.find({})
      .populate('buyer_id', {
        salt: 0,
        password: 0
      })
      .populate('products._id')

    res.status(200).send({
      message: 'Get all carts',
      carts: carts
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  createNewCart: async (req, res, next) => {
    // default cart state
    const currentCart = await Cart.findOne({
      buyer_id: { _id: req.decoded.sub }
    })

    if (currentCart) {
      let productIndex = 0
      const currentProduct = currentCart.products.find((product, index) => {
        if (product._id.toString() === req.body.products[0]._id) {
          productIndex = index
        }
        return product._id.toString() === req.body.products[0]._id
      })
      if (currentProduct) {
        console.log(currentCart.products[productIndex])
        currentCart.products[productIndex].quantity =
          currentCart.products[productIndex].quantity +
          req.body.products[0].quantity
        currentCart.save()
      } else {
        console.log('no product')

        currentCart.products.push(req.body.products[0])
        currentCart.save()
      }

      res.send({
        message: 'Cart has benn updated',
        result: currentCart
      })
    } else {
      // console.log(req.decoded.sub)
      const newCart = {
        buyer_id: req.decoded.sub, // buyer's objectId
        products: req.body.products,
        paid: false,
        checkout: false
      }

      const result = await Cart.create(newCart)

      res.send({
        message: 'Created new cart',
        result: result
      })
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  getOneCartById: async (req, res, next) => {
    // Cart.find({}).populate({ path: 'userId', populate: { path: 'reviewId' } })

    const cart = await Cart.findOne({ id: Number(req.params.id) })
      .populate({
        path: 'products._id'
      })
      .populate({
        path: 'products._id',
        populate: {
          path: 'commodity_id',
          model: 'Commodity'
        }
      })

    res.status(200).send({
      message: 'Get one cart by id',
      cart: cart
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  addProduct: async (req, res, next) => {
    const cart = await Cart.findOneAndUpdate(
      { id: Number(req.params.id) },
      {
        $push: {
          products: {
            _id: req.body._id,
            quantity: req.body.quantity
          }
        }
      },
      { new: true }
    )

    res.status(200).send({
      message: 'Add product to cart',
      cart: cart
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  addAddress: async (req, res, next) => {
    const cart = await Cart.findOneAndUpdate(
      { id: Number(req.params.id) },
      { $set: { address: req.body.address } },
      { new: true }
    )

    res.status(200).send({
      message: 'Add address to the cart',
      cart: cart
    })
  },
  ////////////////////////////////////////////////////////////////////////////////
  checkout: async (req, res, next) => {
    const cart = await Cart.findOneAndUpdate(
      { id: Number(req.params.id) },
      {
        $set: {
          checkout: true,
          addaress: req.body.address
        }
      }
    ).populate({
      path: 'products._id',
      populate: { path: 'products_id' }
    })

    res.send(cart)
  },
  ///////////////////////////////////////////////////////////////////////////////////
  paid: async (req, res, next) => {
    await Cart.findOneAndUpdate(
      { id: Number(req.params.id) },
      { $set: { paid: true } }
    )

    res.send({
      message: 'the cart is allready paid'
    })
  }
}

module.exports = controller
