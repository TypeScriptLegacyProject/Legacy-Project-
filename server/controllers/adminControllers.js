const db = require("../database/index.js");

module.exports = {
  getadmin: (req, res) => {
    db.admin
      .findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  addadmin: (req, res) => {
    db.admin
      .create(req.body)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  getOneadmin: (req, res) => {
    db.admin
      .findOne({
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
  removeadmin: (req, res) => {
    db.admin
      .destroy({
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
  updateadmin: (req, res) => {
    db.admin
      .update(req.body, {
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
  allCustomer: async (req, res) => {
    try {
      const user = await db.User.findAll();
      const sellers = await db.Seller.findAll();
      res.status(200).json({ user, sellers });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },
  deleteall: async (req, res) => {
    const { email } = req.params;
    try {
      let user = await db.Seller.findOne({ where: { email } });
      if (!user) {
        user = await db.User.findOne({ where: { email } });
      }
      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }
      await user.destroy();
      res.status(200).json({ message: "user deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },
  changeRole: async (req, res) => {
    const { email } = req.body;
    try {
      let user = await db.Seller.findOne({ where: { email } });
      if (user) {
        const newUser = await db.User.create({
          username: user.username,
          email: user.email,
          password: user.password,
          role: "user",
        });
        await user.destroy();
        return res.status(200).json(newUser);
      }
      user = await db.User.findOne({ where: { email } });
      if (user) {
        const newSeller = await db.Seller.create({
          username: user.username,
          email: user.email,
          password: user.password,
          role: "seller",
        });
        await user.destroy();
        return res.status(200).json(newSeller);
      }
      res.status(404).json({ error: "user not found" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },
};
