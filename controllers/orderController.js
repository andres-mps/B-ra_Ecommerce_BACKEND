const { Order, User } = require("../models");

// Muestra todas las ordenes
async function index(req, res) {
  const orders = await Order.findAll();
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
// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  const userId = req.params.userId;
  const { products, subTotalPrice, taxes, totalAmount, status, address } = req.body;
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
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {
  const orderId = req.params.id;
  const order = await Order.findByPk(orderId);
  const { products, subTotalPrice, taxes, totalAmount, status, address } = req.body;
  order.products = products;
  order.subTotalPrice = subTotalPrice;
  order.taxes = taxes;
  order.totalAmount = totalAmount;
  order.status = status;
  order.address = address;
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
  create,
  store,
  edit,
  update,
  destroy,
};