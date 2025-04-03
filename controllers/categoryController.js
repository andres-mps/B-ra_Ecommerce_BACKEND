const { Category, Product } = require("../models");
const formidable = require("formidable");
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

async function index(req, res) {
  const categories = await Category.findAll({
    where: { active: true },
    include: { model: Product, attributes: ["id", "name", "active"] },
    order: [["id", "ASC"]],
  });
  res.json(categories);
}
async function indexAdmin(req, res) {
  const categories = await Category.findAll({
    include: { model: Product, attributes: ["id", "name", "active"] },
    order: [["id", "ASC"]],
  });
  res.json(categories);
}

async function show(req, res) {
  const params = req.params.category;
  try {
    const category = await Category.findOne({
      where: { slug: params },
      include: { model: Product },
    });
    return res.json(category.products);
  } catch {
    return res.json({ type: "err", content: "There are no products in the selected category" });
  }
}
async function showCategory(req, res) {
  const params = req.params.category;
  try {
    const category = await Category.findOne({
      where: { slug: params },
    });
    return res.json(category);
  } catch {
    return res.json({ type: "err", content: "There are no products in the selected category" });
  }
}

async function store(req, res) {
  //console.log("llega");
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    console.log(err);
    const { name, active, slug } = fields;

    if (files.image) {
      const ext = path.extname(files.image.filepath);
      const newFileName = `image_${Date.now()}${ext}`;
      image = newFileName;
      const { data, error } = await supabase.storage
        .from("images")
        .upload(newFileName, fs.createReadStream(files.image.filepath), {
          cacheControl: "3600",
          upsert: false,
          contentType: files.image.mimetype,
          duplex: "half",
        });
    } else {
      image = "";
    }

    try {
      const newCategory = new Category({
        name,
        image: image,
        active,
        slug,
      });
      await newCategory.save();
      res.json(newCategory);
    } catch (err) {
      return res.json({
        err: "err",
        message: "Failed to create. Plase try again with another name",
      });
    }
  });
}

async function update(req, res) {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  const categoryId = req.params.category;

  try {
    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      const { name, active } = fields;

      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.json({ err: "err", message: "Category not found" });
      }
      if (category.name === "Unknown") {
        return res.json({
          err: "err",
          message: "This category cannot be modified",
        });
      }
      if (active === "false") {
        const products = await Product.findAll({ where: { categoryId } });
        //console.log(products);

        for (const product of products) {
          product.active = false;
          await product.save();
        }
      }
      name && name !== category.name && (category.name = name);
      active && active !== category.active && (category.active = active);
      console.log(files.image);
      if (files.image) {
        const ext = path.extname(files.image.filepath);
        const newFileName = `image_${Date.now()}${ext}`;
        image = newFileName;
        const { data, error } = await supabase.storage
          .from("images")
          .upload(newFileName, fs.createReadStream(files.image.filepath), {
            cacheControl: "3600",
            upsert: false,
            contentType: files.image.mimetype,
            duplex: "half",
          });
      } else {
        image = category.image;
      }

      category.image = image;

      await category.save();
      res.json(category);
    });
  } catch (error) {
    return res.json({
      err: "err",
      message: "Failed to update. Plase try again",
    });
  }
}

async function destroy(req, res) {
  const id = req.params.id;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.json({ err: "err", message: "Category not found" });
    }
    if (category.name === "Unknown") {
      return res.json({
        err: "err",
        message: "This category cannot be deleted",
      });
    }
    const products = await Product.findAll({ where: { categoryId: category.id } });
    await Promise.all(products.map((product) => product.update({ active: false, categoryId: 5 })));
    await category.destroy();
    await Promise.all([category.save(), ...products.map((product) => product.save())]);
    res.json({ message: "Category successfully removed" });
  } catch (error) {
    console.error(error);
    res.json({
      err: "err",
      message: "Failed to delete. Plase try again",
    });
  }
}

module.exports = {
  index,
  indexAdmin,
  show,
  showCategory,
  store,
  update,
  destroy,
};
