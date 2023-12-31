require("dotenv").config();
//config database env
module.exports =
{
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT,
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "csmarket",
    "host": "172.30.32.1",
    "dialect": "mysql",
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "csmarket",
    "host": "172.30.32.1",
    "dialect": "mysql"
  }
}