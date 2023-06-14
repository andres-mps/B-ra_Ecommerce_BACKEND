require("dotenv").config();

async function runAllSeeders() {
  await require("./categorySeeder")();
  await require("./productsSeeder")();
  await require("./userSeeder")();
  await require("./orderSeeder")();
  await require("./adminSeeder")();

  console.log("[Database] ¡Los datos de prueba fueron insertados!");
}

runAllSeeders();
