const { Category } = require("../models");
const slugify = require("slugify");

module.exports = async () => {
  const categories = [
    {
      name: "IPA",
      active: true,
      image: "hoppy-beers.webp",
    },
    {
      name: "Sour",
      active: true,
      image: "sours2.webp",
    },
    {
      name: "Stout",
      active: true,
      image: "collection-toolnatur_f033ba0c-a0d6-43ca-b8a1-fb03ef2ebc25.webp",
    },
    {
      name: "Lager & Pilsner",
      active: true,
      image: "pilsner.webp",
    },
    {
      name: "Unknown",
      active: false,
      image: "category_unknown.jpg",
    },
  ];

  categories.forEach((category) => {
    category.slug = slugify(category.name, { lower: true, replacement: "-" });
  });

  await Category.bulkCreate(categories);
  console.log("[Database] Se corrió el seeder de Categories.");
};
