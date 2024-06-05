const db = require("../database/index");

module.exports = {
  getSellerProd: async (req, res) => {
    try {
      const data = await db.Product.findAll({
        where: { SellerId: req.params.idd },
      });
      res.json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getOneSellerProd: async (req, res) => {
    try {
      const data = await db.Product.findOne({
        where: { id: req.params.id },
      });
      res.json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addSellerProd: async (req, res) => {
    try {
      const data = await db.Product.create(req.body);
      res.json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  removeSellerProd: async (req, res) => {
    try {
      const data = await db.Product.destroy({ where: { id: req.params.id } });
      res.json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateSellerProd: async (req, res) => {
    try {
      const data = await db.Product.update(req.body, {
        where: { id: req.params.id },
      });
      res.json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getSeller: async (req, res) => {
    try {
      const data = await db.Seller.findAll();
      res.send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  removeSeller: async (req, res) => {
    try {
      const data = await db.Seller.destroy({ where: { id: req.params.id } });
      res.json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

//Changes made:
// i converted to the code async/await to improve readability and added 500 status to all errors