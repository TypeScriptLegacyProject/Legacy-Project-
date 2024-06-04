

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    name:
    { type : DataTypes.STRING,
    allowNull : false },
    

    imgUrl: {
      type: DataTypes.STRING,
      allowNull : false 
    },

    category:{
      type: DataTypes.STRING,
      allowNull : false 
    },
    price:{
      type: DataTypes.STRING,
      allowNull : false 
    },
    description:{
      type: DataTypes.STRING,
      allowNull : false 
    },
    condition: DataTypes.STRING,
  });
  return Product;
};
