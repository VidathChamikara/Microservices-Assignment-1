const express = require("express");
const app = express();

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`MicroserviceA listening on port ${PORT}`);
});

module.exports = app; // Export the app instance


