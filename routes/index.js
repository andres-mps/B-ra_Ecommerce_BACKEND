const publicRoutes = require("./publicRoutes");
const privateRoutes = require("./privateRoutes");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");

module.exports = (app) => {
  app.use("/", publicRoutes);
  app.use("/panel", privateRoutes);
  app.use("/", productRoutes);
  app.use("/", categoryRoutes);

  // app.use("/products", productRoutes);
  // app.use("/categories", categoryRoutes);
};
