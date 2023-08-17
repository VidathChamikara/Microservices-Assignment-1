const express = require('express');


const app = express();

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`MicroserviceB listening on port ${PORT}`);
});

module.exports = app; // Export the app instance