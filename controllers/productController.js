const { Product, Category } = require("../models");
const formidable = require("formidable");

async function index(req, res) {
  const products = await Product.findAll({
    include: [{ model: Category, attributes: ["id", "name"] }],
  });
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
async function store(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    console.log(files);
    const { name, description, abv, size, stock, price, featured, active, slug, categoryId } =
      fields;

    const newProduct = new Product({
      name: name,
      description: description,
      abv: abv,
      size: size,
      stock: stock,
      price: price,
      image: "img/products/" + files.image.newFilename,
      featured: featured,
      active: active,
      slug: slug,
      categoryId: categoryId,
    });

    await newProduct.save();

    res.json(newProduct);
  });
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const form = formidable({
      multiples: true,
      uploadDir: __dirname + "/../public/img",
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      const { id, name } = fields;

      const product = await Product.findByPk(id);
      if (!product) {
        return res.json({ error: "Product not found" });
      }

      if (name && name !== product.name) {
        product.name = name;
      }

      if (description && description !== product.name) {
        product.name = name;
      }

      await product.save();
      res.json(product);
    });
  } catch (error) {
    console.error(error);
    res.json({ error: "Error" });
  }
}

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
