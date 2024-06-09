const db = require("../database/index.js");

module.exports = {
  getUserCart: async (req, res) => {
    try {
      const user = await db.User.findAll({
        include: db.Product,
        where: { id: req.params.userId },
      });
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addToPanier: async (req, res) => {
    try {
      const result = await db.Panier.create({
        productId: req.body.productId,
        UserId: req.body.UserId,
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  remove: async (req, res) => {
    try {
      await db.Panier.destroy({ where: { productId: req.params.productId } });
      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  allpanier:async(req,res)=>{
    try{
   const data=   await db.Panier.findAll()
      res.send(data)
    }
    catch (err) {
      res.status(500).send(err);
  }
}
}

//Changes made:
// i converted to the code async/await to improve readability and added 500 status to all errors
