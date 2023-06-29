const { Product, Category } = require("../models");
const formidable = require("formidable");
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

async function index(req, res) {
  const products = await Product.findAll({
    where: { active: true },
    include: [{ model: Category, attributes: ["id", "name"] }],
    order: [["id", "ASC"]],
  });
  res.json(products);
}
async function indexAdmin(req, res) {
  const products = await Product.findAll({
    include: [{ model: Category, attributes: ["id", "name"] }],
    order: [["id", "ASC"]],
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
    where: { featured: true },
    include: { model: Category, attributes: ["id", "name"] },
    order: [["id", "ASC"]],
  });
  res.json(products);
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

  try {
    const form = formidable({
      multiples: true,
      uploadDir: __dirname + "/../public/img",
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      console.log(err);
      const { name, description, abv, size, stock, price, featured, active, slug, categoryId } =
        fields;

      // let mainNew = "";
      // let altNew = "";
      // files.mainImage ? (mainNew = files.mainImage.newFilename) : (mainNew = "");
      // files.altImage ? (altNew = files.altImage.newFilename) : (altNew = "");

      let mainNew = "";
      let altNew = "";
      if (files.mainImage) {
        const ext = path.extname(files.mainImage.filepath);
        const newFileName = `image_main_${Date.now()}${ext}`;
        mainNew = newFileName;
        const { data, error } = await supabase.storage
          .from("images")
          .upload(newFileName, fs.createReadStream(files.mainImage.filepath), {
            cacheControl: "3600",
            upsert: false,
            contentType: files.mainImage.mimetype,
            duplex: "half",
          });
      } else {
        mainNew = product.image.main;
      }

      if (files.altImage) {
        const ext = path.extname(files.altImage.filepath);
        const newFileName = `image_alt_${Date.now()}${ext}`;
        altNew = newFileName;
        const { data, error } = await supabase.storage
          .from("images")
          .upload(newFileName, fs.createReadStream(files.altImage.filepath), {
            cacheControl: "3600",
            upsert: false,
            contentType: files.altImage.mimetype,
            duplex: "half",
          });
      } else {
        altNew = product.image.alt;
      }

      const newProduct = new Product({
        name,
        description,
        abv,
        size,
        stock,
        price,
        image: { main: mainNew, alt: altNew },
        featured,
        active,
        slug,
        categoryId,
      });
      await newProduct.save();
      res.json(newProduct);
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

  const productId = req.params.product;
  try {
    const form = formidable({
      multiples: true,
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

      let main = "";
      let alt = "";
      if (files.mainImage) {
        const ext = path.extname(files.mainImage.filepath);
        const newFileName = `image_main_${Date.now()}${ext}`;
        main = newFileName;
        const { data, error } = await supabase.storage
          .from("images")
          .upload(newFileName, fs.createReadStream(files.mainImage.filepath), {
            cacheControl: "3600",
            upsert: false,
            contentType: files.mainImage.mimetype,
            duplex: "half",
          });
      } else {
        main = product.image.main;
      }

      if (files.altImage) {
        const ext = path.extname(files.altImage.filepath);
        const newFileName = `image_alt_${Date.now()}${ext}`;
        alt = newFileName;
        const { data, error } = await supabase.storage
          .from("images")
          .upload(newFileName, fs.createReadStream(files.altImage.filepath), {
            cacheControl: "3600",
            upsert: false,
            contentType: files.altImage.mimetype,
            duplex: "half",
          });
      } else {
        alt = product.image.alt;
      }

      product.image = { main: main, alt: alt };

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
  indexAdmin,
  show,
  indexFeatured,
  create,
  store,
  update,
  destroy,
};
