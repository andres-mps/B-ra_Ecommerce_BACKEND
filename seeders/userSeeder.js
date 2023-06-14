const { faker } = require("@faker-js/faker");
const { User } = require("../models");
const bcrypt = require("bcryptjs");

faker.locale = "es";

module.exports = async () => {
  const users = [];
  const passwordHashed = await bcrypt.hash("1234", 5);
  for (let i = 1; i < 30; i++) {
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
