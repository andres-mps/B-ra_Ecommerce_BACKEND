const { Category } = require("../models");
const slugify = require("slugify");

module.exports = async () => {
  const categories = [
    {
      name: "IPA",
      image: "hoppy-beers.webp",
    },
    {
      name: "Sour",
      image: "sours2.webp",
    },
    {
      name: "Stout",
      image: "collection-toolnatur_f033ba0c-a0d6-43ca-b8a1-fb03ef2ebc25.webp",
    },
    {
      name: "Lager & Pilsner",
      image: "pilsner.webp",
    },
  ];

  categories.forEach((category) => {
    category.slug = slugify(category.name, { lower: true, replacement: "-" });
  });

  await Category.bulkCreate(categories);
  console.log("[Database] Se corrió el seeder de Categories.");
};
