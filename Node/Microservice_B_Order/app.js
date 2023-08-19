const express = require('express');
const sql = require('mssql/msnodesqlv8');

const app = express();

const PORT = 3002;

// Database configuration
var dbConfig = { 
  server: "localhost",   
  database: 'Order',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true, // Use Windows authentication       
  },
};

// Establish a connection pool
sql.connect(dbConfig)
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection failed', err));

 

app.listen(PORT, () => {
  console.log(`MicroserviceB listening on port ${PORT}`);
});

module.exports = app; // Export the app instance