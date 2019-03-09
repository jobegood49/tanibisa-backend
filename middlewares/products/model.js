require('dotenv').config()
const mongoose = require('../../config/mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

// Products schema
const Productschema = Schema({
  product_name: String,
  farmer_id: Object, // from token's sub
  commodity_id: Object,
  price: Number,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
})

// plug the AutoIncrement plugin into the schema to create auto incremented id
// id is different with _id
// inc_field is to track which id to increment
Productschema.plugin(AutoIncrement, {
  id: 'Products_counter',
  inc_field: 'id'
})

const Products = mongoose.model('{Products}', Productschema)

module.exports = Products
