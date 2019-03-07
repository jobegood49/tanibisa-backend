require('dotenv').config()
const mongoose = require('../../config/mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

// Buyer schema
const BuyerSchema = mongoose.Schema({
  name: String,
  email: String,
  salt: String,
  password: String
})

// plug the AutoIncrement plugin into the schema to create auto incremented id
// id is different with _id
// inc_field is to track which id to increment
BuyerSchema.plugin(AutoIncrement, {
  id: 'buyers_counter',
  inc_field: 'id'
})

// Byer model => Buyers collection
const Buyer = mongoose.model('Buyer', BuyerSchema)

module.exports = Buyer
