require('dotenv').config()
const mongoose = require('../../config/mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

// Cart schema
const CartSchema = mongoose.Schema({
  _id: Number,
  buyer_id: {
    type: Schema.Types.ObjectId, // from token's req.decoded.sub
    ref: 'Buyer'
  },
  id: Number,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  paid: Boolean
})

// plug the AutoIncrement plugin into the schema to create auto incremented id
// id is different with _id
// inc_field is to track which id to increment
CartSchema.plugin(AutoIncrement, {
  id: 'carts_counter',
  inc_field: 'id'
})

// Cart model => Carts collection
const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart
