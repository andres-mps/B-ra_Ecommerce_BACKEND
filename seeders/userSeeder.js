const { faker } = require("@faker-js/faker");
const { User } = require("../models");
const bcrypt = require("bcryptjs");

faker.locale = "es";

module.exports = async () => {
  const users = [];
  const passwordHashed = await bcrypt.hash("1234", 5);
  users.push({
    firstname: "Unknown",
    lastname: "Unknown",
    email: "Unknown@Unknown",
    password: passwordHashed,
    address: "Unknown",
    phone: "099000000",
  });
  users.push({
    firstname: "Maria",
    lastname: "Pérez",
    email: "maria@gmail.com",
    password: passwordHashed,
    address: "18 Julio 1932",
    phone: "099000000",
  });
  for (let i = 1; i < 29; i++) {
    users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: passwordHashed,
      address: faker.address.streetAddress(true),
      phone: faker.phone.phoneNumber("09#-###-###"),
    });
  }

  await User.bulkCreate(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
