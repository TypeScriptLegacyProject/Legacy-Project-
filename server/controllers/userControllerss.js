const db = require("../database/index");

module.exports = {
  getusers: (req, res) => {
    db.User.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  addusers: (req, res) => {
    db.User.create(req.body)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  getOneuser: (req, res) => {
    db.User.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  removeuser: (req, res) => {
    db.User.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
};
