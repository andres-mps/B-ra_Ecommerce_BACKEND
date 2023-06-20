const { Order } = require("../models");

module.exports = async () => {
  const orders = [
    {
      products: {
        "product.id": "1",
        "product.name": "#DIPA",
        qty: 3,
        price: 20,
      },
      subTotalPrice: 24,
      taxes: 2,
      totalAmount: 26,
      status: "pending",
      address: "SiempreViva 3333",
      userId: 2,
    },
    {
      products: {
        "product.id": "1",
        "product.name": "#DIPA",
        qty: 3,
        price: 20,
      },
      subTotalPrice: 24,
      taxes: 2,
      totalAmount: 26,
      status: "pending",
      address: "SiempreViva 3333",
      userId: 2,
    },
    {
      products: {
        "product.id": "1",
        "product.name": "#DIPA",
        qty: 3,
        price: 20,
      },
      subTotalPrice: 24,
      taxes: 2,
      totalAmount: 26,
      status: "pending",
      address: "SiempreViva 3333",
      userId: 1,
    },
  ];

  await Order.bulkCreate(orders);
  console.log("[Database] Se corrió el seeder de Order.");
};
