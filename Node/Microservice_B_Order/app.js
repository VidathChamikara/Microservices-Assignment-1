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
app.use('/api/order', orderRoute);
app.use('/api/orderItem', orderItemRoute);

app.listen(PORT, () => {
  console.log(`Microservice_B_Order listening on port ${PORT}`);
});

module.exports = app; // Export the app instance
