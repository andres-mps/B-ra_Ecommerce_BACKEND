const { Product, Category } = require("../models");

async function showHome(req, res) {
  const articles = await Product.findAll();
  res.render("home", { articles });
}

async function showContact(req, res) {
  res.render("contact");
}

async function showAboutUs(req, res) {
  res.render("aboutUs");
}

async function featuredProducts(req, res) {
  const products = await Product.findAll({ where: { featured: 1 }, include: { model: Category } });
  res.json(products);
}

// Otros handlers...
// ...

module.exports = {
  showHome,
  showContact,
  showAboutUs,
  featuredProducts,
};
