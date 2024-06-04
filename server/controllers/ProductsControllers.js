const db = require("../database/index");

module.exports = {
  getProducts: async (req, res) => {
    try {
      const data = await db.Product.findAll();
      res.send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  addProduct: async (req, res) => {
    try {
      const data = await db.Product.create(req.body);
      res.send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getOneProduct: async (req, res) => {
    try {
      const data = await db.Product.findOne({ where: { id: req.params.id } });
      res.send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  remove: async (req, res) => {
    try {
      const data = await db.Product.destroy({ where: { id: req.params.id } });
      res.json(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  update: async (req, res) => {
    try {
      const data = await db.Product.update(req.body, {
        where: { id: req.params.id },
      });
      res.send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getByCategory: async (req, res) => {
    try {
      const data = await db.Product.findAll({
        where: { category: req.params.category },
      });
      res.send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getByCondition: async (req, res) => {
    try {
      const data = await db.Product.findAll({
        where: { condition: req.params.condition },
      });
      res.send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

//Changes made:
// i converted to the code async/await to improve readability and added 500 status to all errors