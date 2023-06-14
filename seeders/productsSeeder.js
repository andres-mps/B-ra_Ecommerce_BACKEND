const { Product } = require("../models");

module.exports = async () => {
  const products = [
    {
      name: "#DIPA",
      description:
        "#DIPA is coming into our core range! After having so much fun with our numbered #DIPA series, we thought we'd bring the ol' girl home to stay and find a forever home. The mother of all DIPAs, dry-hopped to the brim with Cascade Citra and Simcoe perfectly balanced by pilsner malts, wheat, and flaked oat.",
      abv: "8.7%",
      size: "44 CL",
      stock: 10,
      price: 45,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/products/dipa.jpg?v=1663749590&width=1100",
      featured: true,
      active: true,
      slug: "",
      categoryId: "1",
    },
    {
      name: "House Of Pale",
      description:
        "House Of Pale is one of the recipes we’ve taken from our beloved mad laboratory in Copenhagen, BRUS. A New England Pale ale with Equanot hops. It’s seen many changes and tweaks over this year, experimenting with hop doses and overall ‘crispiness’ - and now we’re pretty sure we’ve got exactly what we’ve been looking for.",
      abv: "5.5%",
      size: "44 CL",
      stock: 10,
      price: 30,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/products/House-Of-Pale.jpg?v=1655280792&width=1100",
      featured: true,
      active: true,
      slug: "",
      categoryId: "2",
    },
    {
      name: "Santa Gose F* It all Pastry Edition",
      description:
        "Christmas can be a hectic time, not least for Santa. So this year he’s kicking back and treating himself. A sweet blend of pineapple, guava, calamansi, vanilla, and lactose brings the sunshine all the way to the North Pole.",
      abv: "4%",
      size: "44 CL",
      stock: 10,
      price: 45,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/products/SantaGosePastryEdition.jpg?v=1663572145&width=600",
      featured: true,
      active: true,
      slug: "",
      categoryId: "3",
    },
    {
      name: "Gelateria Gelato Summer Gose",
      description:
        "A true thirst quenching Gelato inspired Gose brewed with Cherry, Almonds, and Lactose. The taste of Amarena gelato, with a bright beautiful red color from the cherry, and it's a bit sweet and a bit sour (like a cherry). A touch of almond helps to round out the cherry ice cream flavor.",
      abv: "6%",
      size: "44 CL",
      stock: 10,
      price: 45,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/products/Gelateria.jpg?v=1653042380&width=600",
      featured: true,
      active: true,
      slug: "",
      categoryId: "4",
    },
  ];

  await Product.bulkCreate(products);
  console.log("[Database] Se corrió el seeder de Products.");
};
