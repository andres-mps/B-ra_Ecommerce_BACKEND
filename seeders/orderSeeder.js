const { User, Product, Order } = require("../models");

module.exports = async () => {
  const users = await User.findAll();
  const products = await Product.findAll();
  const orders = [];

  for (const user of users) {
    if (user.firstname !== "Unknown") {
      const qty = Math.floor(Math.random() * 10) + 1;
      const qty2 = Math.floor(Math.random() * 10) + 1;
      const qty3 = Math.floor(Math.random() * 10) + 1;
      const qty4 = Math.floor(Math.random() * 10) + 1;
      const product = Math.floor(Math.random() * (products.length - 1));
      const product2 = Math.floor(Math.random() * (products.length - 1));
      const product3 = Math.floor(Math.random() * (products.length - 1));
      const product4 = Math.floor(Math.random() * (products.length - 1));
      orders.push(
        {
          products: [
            {
              "product.id": products[product].id,
              "product.name": products[product].name,
              "product.image": products[product].image,
              "product.description": products[product].description,
              qty: qty,
              price: products[product].price,
            },
            {
              "product.id": products[product2].id,
              "product.name": products[product2].name,
              "product.image": products[product2].image,
              "product.description": products[product2].description,
              qty: qty2,
              price: products[product2].price,
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
          status: "pending",
          address: user.address,
          userId: user.id,
        },
        {
          products: [
            {
              "product.id": products[product3].id,
              "product.name": products[product3].name,
              "product.image": products[product3].image,
              "product.description": products[product3].description,
              qty: qty3,
              price: products[product3].price,
            },
            {
              "product.id": products[product4].id,
              "product.name": products[product4].name,
              "product.image": products[product4].image,
              "product.description": products[product4].description,
              qty: qty4,
              price: products[product4].price,
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
          status: "pending",
          address: user.address,
          userId: user.id,
        },
      );
    }
  }
  await Order.bulkCreate(orders);
  console.log("[Database] Se corrió el seeder de Order.");
};
