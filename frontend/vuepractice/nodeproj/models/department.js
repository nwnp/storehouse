/* eslint-disable */

const Sequelize = require("sequelize");

module.exports = class Department extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(50),
        },
        code: {
          type: Sequelize.STRING(50),
        },
        description: {
          type: Sequelize.TEXT,
        },
      },
      {
        sequelize,
        underscored: true,
        timestamps: true,
        paranoid: true,
      }
    );
  }
};
