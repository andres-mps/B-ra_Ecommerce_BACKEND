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
  try {
    const form = formidable({
      multiples: true,
      uploadDir: __dirname + "/../public/img",
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      const { name, description, abv, size, stock, price, featured, active, slug, categoryId } =
        fields;
      console.log(files);
      const newProduct = new Product({
        name,
        description,
        abv,
        size,
        stock,
        price,
        image: files.image.newFilename,
        featured,
        active,
        slug,
        categoryId,
      });
      await newProduct.save();
      res.json(newProduct);
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  const productId = req.params.product;
  console.log(req.params.id);
  try {
    const form = formidable({
      multiples: true,
      uploadDir: __dirname + "/../public/img",
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      const { name, description, abv, size, stock, price, featured, active, slug, categoryId } =
        fields;

      const product = await Product.findByPk(productId);
      if (!product) {
        return res.json({ error: "Product not found" });
      }

      name && name !== product.name && (product.name = name);
      description && description !== product.description && (product.description = description);
      abv && abv !== product.abv && (product.abv = abv);
      size && size !== product.size && (product.size = size);
      stock && stock !== product.stock && (product.stock = stock);
      price && price !== product.price && (product.price = price);
      featured && featured !== product.featured && (product.featured = featured);
      active && active !== product.active && (product.active = active);
      categoryId && categoryId !== product.categoryId && (product.categoryId = categoryId);
      slug && slug !== product.slug && (product.slug = slug);

      files.image && files.image !== product.image && (product.image = files.image.newFilename);

      await product.save();
      res.json(product);
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const productId = req.params.product;
  try {
    await Product.destroy({
      where: {
        id: productId,
      },
    });
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
  index,
  show,
  indexFeatured,
  create,
  store,
  update,
  destroy,
};
