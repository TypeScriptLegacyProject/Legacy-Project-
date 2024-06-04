const db= require('../database/index')

module.exports = {
getOne : (req,res)=>{
    db.Seller.findOne()
    db.Product.findOne({
        where: {
          id: req.params.id,
        },
      })
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json(err);
        });
    },
    updateOne: (req, res) => {
      db.Product.update(req.body, {
        where: {
          id: req.params.id,
        },
      })
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json(err);
        });
    }
  }