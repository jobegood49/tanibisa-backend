const Buyer = require('./model')

const controller = {
  getBuyers: async (req, res, next) => {
    const allBuyers = await Buyer.find()

    res.status(200).send({
      buyers: allBuyers
    })
  },
  getBuyerById: async (req, res, next) => {
    // console.log(typeof req.params.id)

    const buyerBydId = await Buyer.findOne({ _id: req.params.id })
    res.send({
      buyer: buyerBydId
    })
  }
}

module.exports = controller
