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
          beforeUpdate: async (admin, options) => {
            const hashedPassword = await bcrypt.hash(admin.password, 5);
            admin.password = hashedPassword;
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
