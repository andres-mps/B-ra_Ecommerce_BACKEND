const { Model, DataTypes } = require("sequelize");

class Order extends Model {
  static initModel(sequelize) {
    Order.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        code: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        products: {
          type: DataTypes.JSON,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        subTotalPrice: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        taxes: {
          type: DataTypes.DECIMAL(10, 2),
        },
        totalAmount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        status: {
          type: DataTypes.STRING,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
      },
      {
        sequelize,
        modelName: "order",
        paranoid: true,
      },
    );
    return Order;
  }
}

module.exports = Order;
