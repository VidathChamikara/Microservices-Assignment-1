const express = require('express');
const dbConnection = require('./dbConnection'); // Path to dbConnection.js
const orderRoute = require('./route/OrderRoute'); // Path to OrderRoute.js
const orderItemRoute = require('./route/OrderItemRoute'); // Path to OrderItemRoute.js

const app = express();

const PORT = 3002;

// Establish database connection
dbConnection.connectToDatabase();

// Add middleware to parse JSON requests
app.use(express.json());

// Use order routes
app.use('/api', orderRoute);
app.use('/api', orderItemRoute);

app.listen(PORT, () => {
  console.log(`MicroserviceB listening on port ${PORT}`);
});

module.exports = app; // Export the app instance
