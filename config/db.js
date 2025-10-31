import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true, // allow multiple queries in one statement
});

// Connect to MySQL server first (without specifying a database)
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to MySQL server");

  // Create database if it doesn't exist
  const createDbQuery = `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`;
  db.query(createDbQuery, (err) => {
    if (err) {
      console.error("Error creating database:", err);
      return;
    }
    console.log(`Database ${process.env.DB_NAME} is ready`);

    // Switch to the new database
    db.changeUser({ database: process.env.DB_NAME }, (err) => {
      if (err) {
        console.error("Error switching database:", err);
        return;
      }

      // Create table if it doesn't exist
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS employees (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          department VARCHAR(255) NOT NULL,
          salary DECIMAL(10,2) NOT NULL,
          joining_date DATE
        );
      `;
      db.query(createTableQuery, (err) => {
        if (err) {
          console.error("Error creating table:", err);
          return;
        }
        console.log("Table 'users' is ready");
      });
    });
  });
});

export default db;

// import mysql from "mysql2";
// import dotenv from "dotenv";
// dotenv.config();

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Database connection failed:", err.stack);
//     return;
//   }
//   console.log("Connected to MySQL database");
// });

// export default db;
