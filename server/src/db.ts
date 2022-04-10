export {};
const tablesPayload = require("./config/tablesPayload");
const Pool = require("pg").Pool;
const db = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

execute();

async function execute() {
  try {
    await db.connect();
    console.log("Connected successfully.");
    await db.query(tablesPayload);
  } catch (ex) {
    console.log(`Something wrong happend ${ex}`);
  }
}

module.exports = db;
