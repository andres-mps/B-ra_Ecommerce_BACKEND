const { Category, Product } = require("../models");
const formidable = require("formidable");

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
    res.json(category.products);
  } catch {
    res.json({ type: "err", content: "No existen productos para la categoria seleccionada" });
  }
}
async function showCategory(req, res) {
  const params = req.params.category;
  try {
    const category = await Category.findOne({
      where: { slug: params },
    });
    res.json(category);
  } catch {
    res.json({ type: "err", content: "No existen productos para la categoria seleccionada" });
  }
}

async function store(req, res) {
  //console.log("llega");
  try {
    const form = formidable({
      multiples: true,
      uploadDir: __dirname + "/../public/img",
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      console.log(err);
      const { name, active, slug } = fields;
      console.log(files);
      const newCategory = new Category({
        name,
        image: files.image.newFilename,
        active,
        slug,
      });
      await newCategory.save();
      res.json(newCategory);
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
}

async function update(req, res) {
  const categoryId = req.params.category;

  try {
    const form = formidable({
      multiples: true,
      uploadDir: __dirname + "/../public/img",
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      const { name, active } = fields;
      //console.log(files);
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.json({ error: "Category not found" });
      }
      if (active === "false") {
        const products = await Product.findAll({ where: { categoryId } });
        console.log(products);

        for (const product of products) {
          product.active = false;
          await product.save();
        }
      }
      name && name !== category.name && (category.name = name);
      active && active !== category.active && (category.active = active);

      files.image && files.image !== category.image && (category.image = files.image.newFilename);

      await category.save();
      res.json(category);
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function destroy(req, res) {
  const id = req.params.id;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    const products = await Product.findAll({ where: { categoryId: category.id } });
    await Promise.all(products.map((product) => product.update({ active: false, categoryId: 5 })));
    await category.destroy();
    await Promise.all([category.save(), ...products.map((product) => product.save())]);
    res.json({ message: "Categoría eliminada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
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
