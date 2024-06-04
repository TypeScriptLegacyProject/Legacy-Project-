const db = require("../database/index.js");
console.log(db.Panier, db.Product);
module.exports = {
  getUserCart: (req, res) => {
    (async (userId) => {
      try {
        const user = await db.User.findAll({
          include: db.Product,
          where: { id: userId },
        });
        res.json(user);
      } catch (err) {
        res.json(err);
        console.log(err);
      }
    })(req.params.userId);
  },
  // getUserCart: (req, res) => {
  //   db.Panier.findAll()
  //     .then((result) => {
  //       res.send(result);
  //     })
  //     .catch((err) => res.send(err));
  // },

  addToPanier: (req, res) => {
    db.Panier.create({ productId: req.body.productId, UserId: req.body.UserId })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => console.error(err));
  },
  remove: (req, res) => {
    db.Panier.destroy({ where: { productId: req.params.productId } })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => console.error(err));
  },
};
