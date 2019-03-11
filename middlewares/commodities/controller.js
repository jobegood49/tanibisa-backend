const Commodity = require('./model')

const controller = {
  //////////////////////////////////////////////////////////////////////////////
  getCommodities: async (req, res, next) => {
    const commodities = await Commodity.find()

    res.status(200).send({
      message: 'List of all commodities',
      commodities: commodities
    })
  },
  //////////////////////////////////////////////////////////////////////////////
  createNewCommodity: async (req, res, next) => {
    const newCommodity = {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      tags: req.body.tags
    }
    const result = await Commodity.create(newCommodity)

    res.send({
      message: 'Created new commodity',
      result: result
    })
  }
}

module.exports = controller
