const db = require("../database/index");

module.exports = {
  getusers: async (req, res) => {
    try {
      const data = await db.User.findAll();
      res.send(data);
    } catch (err) {
      res.status(500).send(err); 
    }
  },
  addusers: async (req, res) => {
    try {
      const data = await db.User.create(req.body);
      res.send(data);
    } catch (err) {
      res.status(500).send(err); 
    }
  },
  getOneuser: async (req, res) => {
    try {
      const data = await db.User.findOne({ where: { id: req.params.id } });
      res.send(data);
    } catch (err) {
      res.status(500).send(err); 
    }
  },
  removeuser: async (req, res) => {
    try {
      const data = await db.User.destroy({ where: { id: req.params.id } });
      res.json(data);
    } catch (err) {
      res.status(500).send(err); 
    }
  },
};


//Changes made:
// i converted to the code async/await to improve readability and added 500 status to all errors