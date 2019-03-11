const Commodity = require('./model')

const controller = {
  seedCommodities: async (req, res, next) => {
    // ...

    res.status(200).send({
      message: 'Seed initial commodities'
    })
  },

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
  },

  getOneCommodityById: async (req, res, next) => {
    const commodity = await Commodity.findOne({ id: Number(req.params.id) })

    res.status(200).send({
      message: 'Get one commodity by id',
      commodity: commodity
    })
  }
}

module.exports = controller
