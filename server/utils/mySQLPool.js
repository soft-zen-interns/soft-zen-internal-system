const mysql = require("mysql");

const DB_HOST='localhost'
const DB_PORT=3306
const DB_USER='root'
const DB_PASSWORD='rootroot'
const DB_DATABASE='softzen'

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE
});

const query = (query, values) =>
  new Promise((res, rej) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        rej(err);
      }
      connection.query(query, values, (error, results, fields) => {
        connection.release();
        if (error) {
          console.log(error);
          rej(error);
        } else {
          res(results, fields);
        }
      });
    });
  });

module.exports.pool = pool;
module.exports.query = query;
