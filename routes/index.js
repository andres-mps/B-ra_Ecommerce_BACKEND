const publicRoutes = require("./publicRoutes");
const privateRoutes = require("./privateRoutes");
const productRoutes = require("./productRoutes");

module.exports = (app) => {
  app.use("/", publicRoutes);
  app.use("/panel", privateRoutes);
  app.use("/beers", productRoutes);
};
