require('dotenv').config()
const mongoose = require('../../config/mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

// Products schema
const Productschema = Schema({
  farmer_id: {
    type: Schema.Types.ObjectId, // from token's req.decoded.sub
    ref: 'Farmer'
  },
  commodity_id: {
    type: Schema.Types.ObjectId,
    ref: 'Commodity'
  },
  price: Number, // item/Kg
  image: String
})

// plug the AutoIncrement plugin into the schema to create auto incremented id
// id is different with _id
// inc_field is to track which id to increment
Productschema.plugin(AutoIncrement, {
  id: 'products_counter',
  inc_field: 'id'
})

const Products = mongoose.model('Product', Productschema)

module.exports = Products
