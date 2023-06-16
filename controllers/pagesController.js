const { Product, Category } = require("../models");

async function products(req, res) {
  const products = await Product.findAll();
  res.json(products);
}

async function styleProducts(req, res) {
  const params = req.params.style;
  const category = await Category.findOne({
    where: { name: params },
    include: { model: Product },
  });
  res.json(category.products);
}

async function showAboutUs(req, res) {
  res.render("aboutUs");
}

async function featuredProducts(req, res) {
  const products = await Product.findAll({
    where: { featured: 1 },
    include: { model: Category, attributes: ["id", "name"] },
  });
  res.json(products);
}

async function categories(req, res) {
  const categories = await Category.findAll({
    include: [{ model: Product, attributes: ["id", "name"] }],
  });
  res.json(categories);
}

// Otros handlers...
// ...

module.exports = {
  products,
  styleProducts,
  showAboutUs,
  featuredProducts,
  categories,
};
