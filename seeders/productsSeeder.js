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
    {
      name: "Berry Barrage",
      description:
        "This red berry sour is bound to be a new To Øl classic! Full of cherry, lingonberry, and red currant, it has the right balance of sweet and tart and the right balance of thirst-quenching and mouth-puckering.",
      abv: "5.2%",
      size: "44 CL",
      stock: 10,
      price: 39,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/products/berry_barrage.jpg?v=1679909048&width=1100",
      featured: false,
      active: true,
      slug: "",
      categoryId: "2",
    },
    {
      name: "Black Pastry Sour",
      description:
        "This is a kettle sour beer that is mostly light in flavour but dark in colour through the addition of a small amount of dark malt. It is flavoured with black currants, to add to the black colour and pastry-fied with lactose and vanilla.",
      abv: "6.0%",
      size: "44 CL",
      stock: 10,
      price: 49,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/products/black_pastry_sour.png?v=1673010152&width=1100",
      featured: false,
      active: true,
      slug: "",
      categoryId: "2",
    },
    {
      name: "Division of Light",
      description:
        "Using the same wort base as our recently released table beer, a portion was added on top of the spent Stevnsbær cherries used to make Ordinance. Where the fruit was at center stage in the latter, the opposite is true of this beer. What we get in return from this second maceration of the fruit is a light, floral and refreshing beer. Canned with local raw honey for a natural carbonation.",
      abv: "6.0%",
      size: "44 CL",
      stock: 10,
      price: 32,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/products/Division-of-Light.jpg?v=1663323981&width=1100",
      featured: false,
      active: true,
      slug: "",
      categoryId: "2",
    },
    {
      name: "Santa's Secret: Mochaccino Messiah Triple Shot",
      description:
        "Ever wondered how Father Christmas delivers presents down all of those chimneys in one night? Well, he may have a little help up his sleeve. Santa's Secret is our classic Mochaccino Messiah - and some. Injected full of coffee, this 8% beauty is both sweet and malty with hints of chocolate, a boost of caffeine and warm Christmas notes of Cinnamon and Cardamom to finish off. He is Scandinavian, after all.",
      abv: "8.3%",
      size: "44 CL",
      stock: 10,
      price: 52,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/products/santas_secret_mochaccino_messiah.jpg?v=1666687742&width=1100",
      featured: false,
      active: true,
      slug: "",
      categoryId: "3",
    },
    {
      name: "12th Anniversary",
      description:
        "This luscious imperial stout contains the number 12 in at least 12 places. (12 malts, abv 12,12, 12kg roibos tea, etc..) it has delicious flavours to give it interesting floral notes - roibos tea, tonka beans, vanilla beans, plus cacao nibs and coffee.",
      abv: "12.12%",
      size: "44 CL",
      stock: 10,
      price: 52,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/products/12th_anniversary.jpg?v=1666774379&width=1100",
      featured: false,
      active: true,
      slug: "",
      categoryId: "3",
    },
    {
      name: "Mexican Hot Chocolat BA",
      description:
        "Cinnamon, chocolate, and chili peppers swirled together in a dark, rich stout for the most comforting, delicious, and downright decadent version of a Mexican hot chocolate you ever laid your hands on. And now in a barrel aged version? Dios mio! Imperial Milk Stout aged 12 months in Bourbon barrels. With additions of Walnuts, Almonds, Hazelnuts, Pecans, Cinnamon, Cacao nibs, Chilis, and Lactose.",
      abv: "11.0%",
      size: "37.5 CL",
      stock: 10,
      price: 96,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/products/MexicanHotChocolateBAImperial-web.jpg?v=1656492722&width=1100",
      featured: false,
      active: true,
      slug: "",
      categoryId: "3",
    },
    {
      name: "Goliat BA",
      description:
        "A towering gargantuan, the great warrior of Gath! The mighty champion of the Philistines and firmly embedded in ancient folklore and religion. Coming from the World of Old. NOW, after laying 10 months in Bourbon barrels, he has risen again once more...",
      abv: "13.7%",
      size: "37.5 CL",
      stock: 10,
      price: 96,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/products/goliatba.jpg?v=1605786525&width=1100",
      featured: false,
      active: true,
      slug: "",
      categoryId: "3",
    },
    {
      name: "45 Days Organic Pilsner",
      description:
        "The slower the fermentation, the better a pilsner tastes. We took no risks and decided to ferment and mature our pilsner no less than 45 days. It would be a sin to rush it after all. Enjoy all the crisp complexity that belongs in the golden lager we all love, and enjoy it more knowing it was made only with the highest respect and admiration for the style.",
      abv: "4.7%",
      size: "44 CL",
      stock: 10,
      price: 34,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/products/45day-organic-pilsner.jpg?v=1663660569&width=1100",
      featured: false,
      active: true,
      slug: "",
      categoryId: "4",
    },
    {
      name: "Collaboration Curse",
      description:
        "A crispy German lager dry hopped with some marvelous New Zealand hops. The result is a smashingly bright and golden, thirst-quenching brew perfect to enjoy on days ending in Y",
      abv: "4.3%",
      size: "44 CL",
      stock: 10,
      price: 34,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/products/collaboration_curse.jpg?v=1661174168&width=1100",
      featured: false,
      active: true,
      slug: "",
      categoryId: "4",
    },
    {
      name: "45 Days Vienna Lager",
      description:
        "Brewed and slowly matured in our beautifully restored lagering tanks at To Øl City. There is no room for flaws in delicate lagers like these. Only noble hops, golden malts, and a little bit of patience.",
      abv: "4.7%",
      size: "44 CL",
      stock: 10,
      price: 37,
      image:
        "https://cdn.shopify.com/s/files/1/0266/3704/1767/products/45_days_vienna.jpg?v=1661172698&width=1100",
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
