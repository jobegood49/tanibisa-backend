require('dotenv').config()
const mongoose = require('../../config/mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

// Farmer schema
const Farmerschema = Schema({
  name: String,
  email: String,
  salt: String,
  password: String,
  image: String,
  location: String,
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
Farmerschema.plugin(AutoIncrement, {
  id: 'farmers_counter',
  inc_field: 'id'
})

// Byer model => Farmers collection
const Farmers = mongoose.model('Farmer', Farmerschema)

module.exports = Farmers
