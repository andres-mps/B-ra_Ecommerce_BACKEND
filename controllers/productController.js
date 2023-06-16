const { Product, Category } = require("../models");

async function index(req, res) {
  const products = await Product.findAll();
  res.json(products);
}

async function show(req, res) {
  const params = req.params.product;
  const product = await Product.findOne({
    where: { slug: params },
    include: { model: Category, attributes: ["id", "name"] },
  });
  res.json(product);
}

async function indexFeatured(req, res) {
  const products = await Product.findAll({
    where: { featured: 1 },
    include: { model: Category, attributes: ["id", "name"] },
  });
  res.json(products);
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  indexFeatured,
  create,
  store,
  edit,
  update,
  destroy,
};
