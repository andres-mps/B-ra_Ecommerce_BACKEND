const { Category } = require("../models");

module.exports = async () => {
  const categories = [
    {
      name: "IPA",
    },
    {
      name: "Sour",
    },
    {
      name: "Stout",
    },
    {
      name: "Lager & Pilsner",
    },
  ];

  await Category.bulkCreate(categories);
  console.log("[Database] Se corrió el seeder de Categories.");
};
