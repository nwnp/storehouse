/* eslint-disable */
const Sequelize = require("sequelize");

module.exports = class Test extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        testId: {
          type: Sequelize.STRING(20),
          unique: true,
        },
        userName: {
          type: Sequelize.STRING(40),
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: true,
      }
    );
  }
};
