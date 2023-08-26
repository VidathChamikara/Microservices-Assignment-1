const express = require("express");
const mongoose = require("mongoose");
const app = express();
const UserRoute = require('./route/UserRoute');
const bodyParser = require('body-parser')

const PORT = 3001;
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/userManagement')
  .then(() => {
    console.log("Successfully Connected to the MongoDB Database");
  })
  .catch(error => {
    console.log("MongoDB connection error", error);
  });

app.use('/api/v1/user', UserRoute); //http://localhost:3001/api/v1/user

app.listen(PORT, () => {
  console.log(`Microservice_A_User listening on port ${PORT}`);
});

// Export the app instance
module.exports = app;


