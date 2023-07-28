const Client = require("pg").Client;

const client = new Client({
  host: "REDACTED",
  user: "REDACTED",
  port: "REDACTED",
  password: "REDACTED",
  database: "REDACTED",
});

module.exports = client;
