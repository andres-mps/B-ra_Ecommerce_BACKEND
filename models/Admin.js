const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class Admin extends Model {
  static initModel(sequelize) {
    Admin.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
      },
      {
        sequelize,
        modelName: "admin",
        paranoid: true,
        hooks: {
          beforeCreate: async (admin, options) => {
            const hashedPassword = await bcrypt.hash(admin.password, 5);
            admin.password = hashedPassword;
          },
          beforeUpdate: async (user, options) => {
            if (user.changed("password")) {
              const hashedPassword = await bcrypt.hash(user.password, 5);
              user.password = hashedPassword;
            }
          },
        },
      },
      (Admin.prototype.comparePassword = async function (passwordToValidate) {
        return await bcrypt.compare(passwordToValidate, this.password);
      }),
    );
    Admin.prototype.toJSON = function () {
      const admin = this.get();
      delete admin.password;
      return admin;
    };
    return Admin;
  }
}

module.exports = Admin;
