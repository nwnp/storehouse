const Sequelize = require("sequelize");

// 모델 불러오기
const User = require("./user");

// 초기 설정
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

// 모델 불러오기
db.sequelize = sequelize;
db.User = User;
User.init(sequelize);

module.exports = db;
