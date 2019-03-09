const Commodities = require('./model')

const controller = {
  /////////////////////////////////
  getCommodities: async (req, res, next) => {
    const allCommodities = await Commodities.find()

    res.status(200).send({
      message: 'List of all commodities',
      commodities: allCommodities
    })
    // },
    // ////////////////////////////////
    // createNewCommodities: async (req, res) => {
    //   const decodedToken = await helpers.verifyToken(req.token)
    //   const newCommodities = {
    //     author: decodedToken.sub,
    //     name: req.body.name,
    //     description: req.body.description,
    //     image: req.body.image
    //   }
    // }
  }
}

module.exports = controller
