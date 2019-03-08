require('dotenv').config()
const mongoose = require('../../config/mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

// Farmer schema
const Farmerschema = mongoose.Schema({
  name: String,
  email: String,
  salt: String,
  password: String,
  image: String,
  location: String
})

// plug the AutoIncrement plugin into the schema to create auto incremented id
// id is different with _id
// inc_field is to track which id to increment
Farmerschema.plugin(AutoIncrement, {
  id: 'Farmers_counter',
  inc_field: 'id'
})

// Byer model => Farmers collection
const Farmers = mongoose.model('Farmers', Farmerschema)

module.exports = Farmers
