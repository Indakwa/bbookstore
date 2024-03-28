const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 3, // Adjust this value according to your needs
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'bbookstore',
});

// Export the connection pool
module.exports = pool;
