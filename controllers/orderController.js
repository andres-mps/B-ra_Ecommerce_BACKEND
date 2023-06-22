const { Order, User, Product } = require("../models");
const { findByPk } = require("../models/User");

// Muestra todas las ordenes
async function index(req, res) {
  const orders = await Order.findAll({
    include: [{ model: User, attributes: ["firstname", "lastname", "email"] }],
  });
  res.json(orders);
}

// Muestra ordenes de un usuario
async function show(req, res) {
  const userId = req.params.userId;
  const user = await User.findByPk(userId);

  try {
    const orders = await Order.findAll({
      where: { userId: user.id },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las órdenes" });
  }
}

// Muestra ordenes de un usuario
async function showOrder(req, res) {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findByPk(orderId);

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la órden" });
  }
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  const userId = req.params.userId;
  const { products, subTotalPrice, taxes, totalAmount, status, address } = req.body;
  if (!products || !totalAmount || !address) {
    return res.json({ err: "err", message: "required fields missing" });
  }
  for (const product of products) {
    const productToControl = await Product.findByPk(product.id);
    const stockControl = productToControl.stock - product.qty;
    if (stockControl < 0) {
      return res.json({
        err: "err",
        message: `Only ${productToControl.stock} stock units for the product ${product.name}. modify your order and try again`,
      });
    }
    productToControl.stock = productToControl.stock - product.qty;
    await productToControl.save();
  }
  try {
    const order = await Order.create({
      products,
      subTotalPrice,
      taxes,
      totalAmount,
      status,
      address,
      userId: userId,
    });
    res.status(201).json(order);
  } catch (error) {
    return res.status(400).json({ err: "err", message: error.message });
  }
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {
  const orderId = req.params.id;
  const order = await Order.findByPk(orderId);
  const { products, subTotalPrice, taxes, totalAmount, status, address } = req.body;

  products && products !== order.products && (order.products = products);
  subTotalPrice && subTotalPrice !== order.subTotalPrice && (order.subTotalPrice = subTotalPrice);
  taxes !== order.taxes && (order.taxes = taxes);
  taxes === "" && (order.taxes = 0);
  totalAmount && totalAmount !== order.totalAmount && (order.totalAmount = totalAmount);
  status !== order.status && (order.status = status);
  address && address !== order.address && (order.address = address);

  await order.save();
  res.json(order);
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const orderId = req.params.id;
  await Order.destroy({
    where: {
      id: orderId,
    },
  });

  res.json({ message: "Orden eliminada correctamente" });
}

module.exports = {
  index,
  show,
  showOrder,
  create,
  store,
  edit,
  update,
  destroy,
};
