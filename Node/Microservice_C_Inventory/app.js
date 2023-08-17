const express = require('express');


const app = express();

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`MicroserviceC listening on port ${PORT}`);
});

module.exports = app; // Export the app instance