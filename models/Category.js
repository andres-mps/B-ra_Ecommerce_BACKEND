const { Model, DataTypes } = require("sequelize");
const slugify = require("slugify");

class Category extends Model {
  static initModel(sequelize) {
    Category.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        active: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        slug: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "category",
      },
    );

    Category.addHook("beforeValidate", "generateSlug", (category) => {
      category.slug = slugify(category.name, { lower: true, replacement: "-" });
    });
    return Category;
  }
}

module.exports = Category;
