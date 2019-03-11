require('dotenv').config()
const mongoose = require('../../config/mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

// Commodities schema
const Commoditiesschema = Schema({
  name: String,
  description: String,
  image: String,
  tags: [
    {
      type: String
    }
  ],
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
Commoditiesschema.plugin(AutoIncrement, {
  id: 'commodities_counter',
  inc_field: 'id'
})

const Commodities = mongoose.model('Commodity', Commoditiesschema)

module.exports = Commodities
