const express = require("express");
const mongoose = require("mongoose");
const app = express();
const UserRoute = require('./route/UserRoute');
const bodyParser = require('body-parser')

const PORT = 3001;
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/userManagement').then(()=>{
  app.listen(PORT , ()=>{
    console
        .log(`MicroserviceA listening on port ${PORT}`);
  });
}).catch(error=>{
  console.log("connect error",error);
});

app.use('/api/v1/user', UserRoute); //http://localhost:3001/api/v1/user

module.exports = app; // Export the app instance


