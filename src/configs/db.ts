import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DATABASE_NAME;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  //   password: "123456",
  database: dbName,
});

export default db;
