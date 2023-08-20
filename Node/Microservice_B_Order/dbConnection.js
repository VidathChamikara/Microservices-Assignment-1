const sql = require('mssql/msnodesqlv8');

// Database configuration
const dbConfig = {
  server: "localhost",
  database: 'Order',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true, // Use Windows authentication
  },
};

// Function to establish a connection pool
async function connectToDatabase() {
  try {
    await sql.connect(dbConfig);
    console.log('Connected to the database');
  } catch (err) {
    console.error('Database connection failed', err);
  }
}

module.exports = {
  connectToDatabase,
};