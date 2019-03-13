const Cart = require('./model')

const controller = {
  //////////////////////////////////////////////////////////////////////////////
  getCarts: async (req, res, next) => {
    const carts = await Cart.find({}).populate('buyer_id', {
      salt: 0,
      password: 0
    })

    res.status(200).send({
      message: 'Get all carts',
      carts: carts
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  createNewCart: async (req, res, next) => {
    // default cart state
    const newCart = {
      buyer_id: req.decoded.sub, // buyer's objectId
      products: [],
      paid: false
    }

    console.log(newCart)

    const result = await Cart.create(newCart)

    res.send({
      message: 'Created new cart',
      result: result
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  getOneCartById: async (req, res, next) => {
    // Cart.find({}).populate({ path: 'userId', populate: { path: 'reviewId' } })

    const cart = await Cart.findOne({ id: Number(req.params.id) }).populate({
      path: 'products._id',
      populate: { path: 'commodity_id' }
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
      { $set: { checkout: true } }
    ).populate({
      path: 'products._id',
      populate: { path: 'products_id' }
    })

    res.send(cart)
  }
}

module.exports = controller
