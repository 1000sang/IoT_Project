const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "username": "admin",
    "password": process.env.DB_PASSWORD,
    "database": "devfloors",
    "host": "devfloors-rds.chymae70qayr.ap-northeast-2.rds.amazonaws.com",
    "dialect": "mysql"
  },
  "test": {
    "username": "admin",
    "password": process.env.DB_PASSWORD,
    "database": "devfloors",
    "host": "devfloors-rds.chymae70qayr.ap-northeast-2.rds.amazonaws.com",
    "dialect": "mysql"
  },
  "production": {
    "username": "admin",
    "password": process.env.DB_PASSWORD,
    "database": "devfloors",
    "host": "devfloors-rds.chymae70qayr.ap-northeast-2.rds.amazonaws.com",
    "dialect": "mysql"
  }
}
