const config = {
  development: {
    username: "postgres",
    password: "root",
    database: "elgeka-web-api",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: "root",
    password: null,
    database: "elgeka-web-api_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: "root",
    password: null,
    database: "elgeka-web-api_production",
    host: "127.0.0.1",
    dialect: "postgres"
  }
};

module.exports = config;