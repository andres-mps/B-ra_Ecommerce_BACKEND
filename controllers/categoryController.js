const { Category, Product } = require("../models");

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
  const id = req.params.id;
  const { name, image } = req.body;

  try {
    await Category.update({ name, image }, { where: { id } });

    res.json({ message: "Categoría actualizada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
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
  create,
  store,
  edit,
  update,
  destroy,
};
