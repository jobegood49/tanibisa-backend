const User = require("./model");

const controller = {
  getUsers: async (req, res, next) => {
    res.status(200).send({
      message: "Users",
      users: await User.find({})
    });
  }
};

module.exports = controller;
