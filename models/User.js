const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
        },
        phone: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "user",
        hooks: {
          beforeCreate: async (user, options) => {
            const hashedPassword = await bcrypt.hash(user.password, 5);
            user.password = hashedPassword;
          },
        },
      },
    );
    return User;
  }
}

module.exports = User;
