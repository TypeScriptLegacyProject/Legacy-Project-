module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    name: DataTypes.TEXT,
    imgUrl: {
      type: DataTypes.STRING,
    },
    category: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    condition: DataTypes.STRING,
  });
  return Product;
};
