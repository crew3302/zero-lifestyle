// config/db.js
const mysql = require('mysql2/promise'); // Using promise-based API
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT) || 3306, // MySQL default port is 3306
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // For MySQL, you might want to set the timezone if you're dealing with TIMESTAMPs
  // timezone: '+00:00', // Example: UTC
});

// Test connection (optional, but good for startup)
pool.getConnection()
  .then(conn => {
    console.log('Successfully connected to the MySQL database.');
    conn.release();
  })
  .catch(err => {
    console.error('Failed to connect to MySQL database. Please check .env settings and ensure MySQL is running on the correct port.');
    console.error('Error details:', err.code, err.fatal, err.message);
    // process.exit(-1); // Consider exiting only if this is critical for startup
  });

module.exports = pool; // Export the pool directly