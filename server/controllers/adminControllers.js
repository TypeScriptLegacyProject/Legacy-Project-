const db=require("../database/index.js")

module.exports = {
    getadmin: (req, res) => {
      db.admin.findAll()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.send(err);
        });
    },
    addadmin: (req, res) => {
        db.admin.create(req.body)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.send(err);
          });
      },
      getOneadmin: (req, res) => {
        db.admin.findOne({
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
        db.admin.destroy({
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
        db.admin.update(req.body, {
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
       allCustomer : async (req, res) => {
        try {
          const user= await db.User.findAll();
          const sellers = await db.Seller.findAll();
      
          res.status(200).json({ user, sellers });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: error.message });
        }
      }
}