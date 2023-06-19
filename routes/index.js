const orderRoutes = require("./orderRoutes");
const adminRoutes = require("./adminRoutes");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const userRoutes = require("./userRoutes");

module.exports = (app) => {
  app.use("/products", productRoutes);
  app.use("/categories", categoryRoutes);
  app.use("/orders", orderRoutes);
  app.use("/users", userRoutes);
  app.use("/admins", adminRoutes);
};
