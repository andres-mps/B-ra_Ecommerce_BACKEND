const { faker } = require("@faker-js/faker");
const { Admin } = require("../models");
const bcrypt = require("bcryptjs");

faker.locale = "es";

module.exports = async () => {
  const admins = [];
  const passwordHashed = await bcrypt.hash("1234", 5);

  admins.push({
    firstname: "Admin",
    lastname: "Admin",
    email: "admin@gmail.com",
    password: passwordHashed,
  });

  for (let i = 1; i < 3; i++) {
    admins.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: passwordHashed,
    });
  }

  await Admin.bulkCreate(admins);
  console.log("[Database] Se corrió el seeder de Admins.");
};
