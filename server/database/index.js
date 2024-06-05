const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("selling", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

const db = {};
db.sequelize = sequelize;

db.Product = require("../models/ProductModels")(sequelize, DataTypes);
db.User = require("../models/UserModels")(sequelize, DataTypes);

db.admin = require("../models/adminModel")(sequelize, DataTypes);
db.Seller = require("../models/sellerModel")(sequelize, DataTypes);

db.Seller.hasMany(db.Product);
db.Product.belongsTo(db.Seller);
db.Panier = require("../models/panierModel")(sequelize, DataTypes);

db.User.belongsToMany(db.Product, { through: db.Panier });
db.Product.belongsToMany(db.User, { through: db.Panier });

sequelize
  .authenticate()
  .then(() => {
    console.log("all good");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("Database & tables created!");
//   })
//   .catch((error) => {
//     console.error("Error creating database & tables:", error);
//   });

module.exports = db;
