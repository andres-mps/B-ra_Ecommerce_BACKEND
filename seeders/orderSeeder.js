const { User, Product, Order } = require("../models");
const nanoidModule = import("nanoid");

module.exports = async () => {
  const users = await User.findAll();
  const products = await Product.findAll();
  const orders = [];
  const nanoid = (await nanoidModule).customAlphabet(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_.",
    10,
  );

  for (const user of users) {
    if (user.firstname !== "Unknown") {
      const code1 = await nanoid();
      const code2 = await nanoid();
      const qty = Math.floor(Math.random() * 10) + 1;
      const qty2 = Math.floor(Math.random() * 10) + 1;
      const qty3 = Math.floor(Math.random() * 10) + 1;
      const qty4 = Math.floor(Math.random() * 10) + 1;
      const product = Math.floor(Math.random() * (products.length - 1));
      const product2 = Math.floor(Math.random() * (products.length - 1));
      const product3 = Math.floor(Math.random() * (products.length - 1));
      const product4 = Math.floor(Math.random() * (products.length - 1));
      const statusList = ["Pending", "In progress", "Delivered"];
      orders.push(
        {
          code: code1,
          products: [
            {
              ...products[product].dataValues,
              qty: qty,
            },
            {
              ...products[product2].dataValues,
              qty: qty2,
            },
          ],
          subTotalPrice: products[product].price * qty + products[product2].price * qty2,
          taxes: Math.floor(
            products[product].price * qty * 0.09 + products[product2].price * qty2 * 0.09,
          ),
          totalAmount:
            products[product].price * qty +
            products[product2].price * qty2 +
            Math.floor(
              products[product].price * qty * 0.09 + products[product2].price * qty2 * 0.09,
            ),
          status: statusList[Math.floor(Math.random() * 3)],
          address: user.address,
          userId: user.id,
        },
        {
          code: code2,
          products: [
            {
              ...products[product3].dataValues,
              qty: qty3,
            },
            {
              ...products[product4].dataValues,
              qty: qty4,
            },
          ],
          subTotalPrice: products[product3].price * qty3 + products[product4].price * qty4,
          taxes: Math.floor(
            products[product3].price * qty3 * 0.09 + products[product4].price * qty4 * 0.09,
          ),
          totalAmount:
            products[product3].price * qty3 +
            products[product4].price * qty4 +
            Math.floor(
              products[product3].price * qty3 * 0.09 + products[product4].price * qty4 * 0.09,
            ),
          status: statusList[Math.floor(Math.random() * 3)],
          address: user.address,
          userId: user.id,
        },
      );
    }
  }
  await Order.bulkCreate(orders);
  console.log("[Database] Se corrió el seeder de Order.");
};
