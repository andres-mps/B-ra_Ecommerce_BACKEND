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
      stock: 100,
      price: 45,
      image: { main: "Action-Directe_44cl_can.webp" },
      featured: false,
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
      stock: 100,
      price: 36,
      image: { main: "brokilde-brown.webp" },
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
      stock: 0,
      price: 36,
      image: { main: "TroubleJuice-44cl.webp" },
      featured: true,
      active: true,
      slug: "",
      categoryId: "1",
    },

    {
      name: "Resin from the Dead",
      description:
        "A super resinous IPA that takes its bitterness and hop profile (cascade, centennial, chinook) from the west coast IPA style but lighter in color. Slight sheen (not quite hazy) and creamier mouthfeel due to a little oats.",
      abv: "6%",
      size: "44 CL",
      stock: 2,
      price: 45,
      image: { main: "resin_from_the_dead.webp", alt: "resin_from_the_dead-side.webp" },
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
      stock: 100,
      price: 36,
      image: { main: "sovs.webp" },
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
      stock: 100,
      price: 30,
      image: { main: "House-Of-Pale.webp" },
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
      stock: 7,
      price: 45,
      image: { main: "SantaGosePastryEdition.webp", alt: "SantaGosePastryEdition-side.webp" },
      featured: true,
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
      stock: 100,
      price: 45,
      image: { main: "Gelateria.webp" },
      featured: true,
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
      stock: 100,
      price: 40,
      image: { main: "trouble-sleep.webp" },
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
      stock: 0,
      price: 39.2,
      image: { main: "PeelTheBurn.webp" },
      featured: false,
      active: true,
      slug: "",
      categoryId: "3",
    },

    {
      name: "Hop-To-Mist",
      description:
        "We're all about trying new things, and this beer is no exception. A 'misty' IPA brewed with a unique combination of Pacifica, Waiti, Loral, and Centennial for beautifully floral and citrus notes.",
      abv: "5.8%",
      size: "44 CL",
      stock: 0,
      price: 39,
      image: { main: "hop-to-mist.webp", alt: "hop-to-mist-side.webp" },
      featured: false,
      active: true,
      slug: "",
      categoryId: "2",
    },
    {
      name: "45 Days Rice Lager",
      description:
        "This is a Japanese-style lager - super clean and crisp with nothing but pilsner malt and rice in it. We used some interesting noble German hops to give it a subtle hint of herbal spiciness.",
      abv: "5%",
      size: "44 CL",
      stock: 100,
      price: 32.8,
      image: { main: "45_days_rice_lager.webp" },
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
      stock: 100,
      price: 28,
      image: { main: "45Days-India-Pale-Lager.webp" },
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
      stock: 0,
      price: 39,
      image: { main: "berry_barrage.webp" },
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
      stock: 100,
      price: 49,
      image: { main: "black_pastry_sour.webp" },
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
      stock: 100,
      price: 32,
      image: { main: "Division-of-Light.webp" },
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
      stock: 100,
      price: 52,
      image: { main: "santas_secret_mochaccino_messiah.webp" },
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
      stock: 100,
      price: 52,
      image: { main: "12th_anniversary.webp" },
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
      stock: 100,
      price: 96,
      image: { main: "MexicanHotChocolateBAImperial-web.webp" },
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
      stock: 100,
      price: 96,
      image: { main: "goliatba.webp" },
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
      stock: 100,
      price: 34,
      image: { main: "45day-organic-pilsner.webp" },
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
      stock: 100,
      price: 34,
      image: { main: "collaboration_curse.webp" },
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
      stock: 100,
      price: 37,
      image: { main: "45_days_vienna.webp" },
      featured: false,
      active: true,
      slug: "",
      categoryId: "4",
    },
  ];

  products.forEach((product) => {
    product.slug = slugify(product.name, { lower: true, replacement: "-" });
  });

  // Product.addHook("beforeValidate", "generateSlug", (product) => {
  //   const slugName = slugify(product.name, { lower: true, replacement: "-" });
  //   product.slug = `${slugName}-${product.id}`;
  // });

  await Product.bulkCreate(products);
  console.log("[Database] Se corrió el seeder de Products.");
};
