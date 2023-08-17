const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`MicroserviceA listening on port ${PORT}`);
});