const { Sequelize } = require("sequelize");

// TODO - boorrar si funciona lo previo
const sequelizeOptions = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_CONNECTION,
  logging: false,
};
if (process.env.DB_CONNECTION === "postgres") {
  sequelizeOptions.dialectModule = require("pg");
}
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  sequelizeOptions,
);

const User = require("./User");
const Order = require("./Order");
const Product = require("./Product");
const Admin = require("./Admin");
const Category = require("./Category");

User.initModel(sequelize);
Order.initModel(sequelize);
Product.initModel(sequelize);
Admin.initModel(sequelize);
Category.initModel(sequelize);

// ==========  Relationships:
Category.hasMany(Product);
Product.belongsTo(Category);
User.hasMany(Order);
Order.belongsTo(User);
//==========================

module.exports = {
  sequelize,
  User,
  Order,
  Product,
  Admin,
  Category,
};
