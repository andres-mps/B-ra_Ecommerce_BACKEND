const { Category, Product } = require("../models");
const formidable = require("formidable");

async function index(req, res) {
  const categories = await Category.findAll({
    include: [{ model: Product, attributes: ["id", "name"] }],
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
    //const products = await Product.findAll();
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
    //const products = await Product.findAll();
    res.json({ type: "err", content: "No existen productos para la categoria seleccionada" });
  }
}

async function create(req, res) {
  const category = await Category.create({
    name: req.body.name,
    image: req.body.image,
  });
  return res.json("creada");
}

async function store(req, res) {}

async function edit(req, res) {}

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
      console.log(files);
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.json({ error: "Category not found" });
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
    await category.destroy();
    res.json({ message: "Categoría eliminada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
}

module.exports = {
  index,
  show,
  showCategory,
  create,
  store,
  edit,
  update,
  destroy,
};
