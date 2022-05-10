export {};
const tablesPayload = require('./config/tablesPayload');
import { Pool } from 'pg';
// const Pool = require('pg').Pool;
const db: Pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});

execute();
async function execute() {
  try {
    await db.connect();
    console.log('Connected successfully.');
    await db.query(tablesPayload);
  } catch (ex) {
    console.log(`Something wrong happend ${ex}`);
  }
}

module.exports = db;

// import { IMain, IDatabase } from 'pg-promise';
// import pgPromise from 'pg-promise';

// const pgp: IMain = pgPromise({
//   query(e: any) {
//     console.log('QUERY RESULT:', e.query);
//   },
//   receive(data: any, result: any, e: any) {
//     console.log(`DATA FROM QUERY ${e.query} WAS RECEIVED.`);
//   }
// });

// const connection: any = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   database: process.env.DB_NAME,
// }
// const db: IDatabase<any> = pgp(connection);


// export default db;