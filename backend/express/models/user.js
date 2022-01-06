const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        description: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        // 여기 부분은 옵션 기능
        sequelize,
        underscored: false,
        timestamps: false,
        modelName: "User", // 모델 이름 설정
        tableName: "users", // 데이터베이스의 table 이름 설정
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {}
};
