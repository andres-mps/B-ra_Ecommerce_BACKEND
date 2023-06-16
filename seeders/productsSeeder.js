const { Product } = require("../models");
const slugify = require("slugify");

module.exports = async () => {
  const products = [
    {
      name: "Action Direct",
      description:
        "#DIPA is coming into our core range! After having so much fun with our numbered #DIPA series, we thought we'd bring the ol' girl home to stay and find a forever home. The mother of all DIPAs, dry-hopped to the brim with Cascade Citra and Simcoe perfectly balanced by pilsner malts, wheat, and flaked oat.",
      abv: "8.7%",
      size: "44 CL",
      stock: 10,
      price: 45,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/files/Action-Directe_44cl_can.jpg?v=1685094260&width=360",
      featured: true,
      active: true,
      slug: "",
      categoryId: "1",
    },
    {
      name: "Trouble Juice",
      description:
        "This is a beer designed with the Norwegian market in mind. It is a slightly fruity session IPA, reminiscent of Snublejuice and featuring apricot (with a touch of pineapple to boost the experience). It features some extra fruity hops - El Dorado, Simcoe, Cascade, and Ekuanot, and is meant to be mostly bright.",
      abv: "4.7%",
      size: "44 CL",
      stock: 10,
      price: 36,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/files/TroubleJuice-44cl.jpg?v=1683707133&width=823",
      featured: true,
      active: true,
      slug: "",
      categoryId: "1",
    },
    {
      name: "Brokilde Brown",
      description:
        "An organic Belgian brown ale with light flavors of clove and banana from the yeast, and a prominent caramel and chocolate malt profile from a variety of darker malts. It uses German noble hops for a hint of spiciness.",
      abv: "6.5%",
      size: "44 CL",
      stock: 10,
      price: 36,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/files/brokilde-brown.jpg?v=1683706583&width=823",
      featured: true,
      active: true,
      slug: "",
      categoryId: "1",
    },
    {
      name: "Sovs",
      description:
        "This is a new juicy IPA from To Øl, with support from some trials at BRUS. This beer uses a fairly neutral yeast, so the main focus of the beer is the hops - a juicy combination of Ekuanot and citra, with idaho gem as a supporting partner. Hop gravy!",
      abv: "6%",
      size: "44 CL",
      stock: 10,
      price: 36,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/files/sovs.jpg?v=1683705460&width=823",
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
      featured: false,
      active: true,
      slug: "",
      categoryId: "1",
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
      featured: false,
      active: true,
      slug: "",
      categoryId: "2",
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
      featured: false,
      active: true,
      slug: "",
      categoryId: "2",
    },
    {
      name: "Trouble Sleep",
      description:
        "Malty, roasted, sweet taste with hints of espresso coffee, pepper, rum raisin, marzipan, coconut, and dark chocolate. Served at 12-14°C with chocolate desserts, or as a companion drink.",
      abv: "12%",
      size: "33 CL",
      stock: 10,
      price: 40,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/products/trouble-sleep.jpg?v=1661777425&width=1100",
      featured: false,
      active: true,
      slug: "",
      categoryId: "3",
    },
    {
      name: "Peel the burn",
      description:
        "This is an imperial stout with eight different types of malt that pushes all the boundaries - a little bit sweet, a little bit smoky, a little roasty, and a lot of chocolate with added roasted orange peel and cardamom.",
      abv: "12.2%",
      size: "33 CL",
      stock: 10,
      price: 39.2,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/products/PeelTheBurn.jpg?v=1679910364&width=1100",
      featured: false,
      active: true,
      slug: "",
      categoryId: "3",
    },
    {
      name: "45 Days Rice Lager",
      description:
        "This is a Japanese-style lager - super clean and crisp with nothing but pilsner malt and rice in it. We used some interesting noble German hops to give it a subtle hint of herbal spiciness.",
      abv: "5%",
      size: "44 CL",
      stock: 10,
      price: 32.8,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/products/45_days_rice_lager.jpg?v=1674046463&width=1100",
      featured: false,
      active: true,
      slug: "",
      categoryId: "4",
    },
    {
      name: "45 DAYS IPL",
      description:
        "Hops and lagers were meant to be. And it’s styles like this that prove you can never get too much of a good thing. A crisp lager with all its delicate complexity, then dry hopped with Idaho Gem, Mosaic, and Strata.",
      abv: "5.5%",
      size: "44 CL",
      stock: 10,
      price: 28,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/products/45Days-India-Pale-Lager.jpg?v=1663660610&width=1100",
      featured: false,
      active: true,
      slug: "",
      categoryId: "4",
    },
  ];

  products.forEach((product) => {
    product.slug = slugify(product.name, { lower: true, replacement: "-" });
  });

  await Product.bulkCreate(products);
  console.log("[Database] Se corrió el seeder de Products.");
};
