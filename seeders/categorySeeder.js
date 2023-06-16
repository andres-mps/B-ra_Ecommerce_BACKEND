const { Category } = require("../models");
const slugify = require("slugify");

module.exports = async () => {
  const categories = [
    {
      name: "IPA",
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/collections/hoppy-beers.jpg?v=1675247646&width=750",
    },
    {
      name: "Sour",
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/collections/sours2.jpg?v=1675248385&width=750",
    },
    {
      name: "Stout",
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/collections/collection-toolnatur_f033ba0c-a0d6-43ca-b8a1-fb03ef2ebc25.jpg?v=1675251318&width=750",
    },
    {
      name: "Lager & Pilsner",
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/collections/pilsner.jpg?v=1675251988&width=750",
    },
  ];

  categories.forEach((category) => {
    category.slug = slugify(category.name, { lower: true, replacement: "-" });
  });

  await Category.bulkCreate(categories);
  console.log("[Database] Se corrió el seeder de Categories.");
};
