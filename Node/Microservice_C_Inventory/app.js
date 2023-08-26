const express = require('express');
const app = express();
const PORT = 3003;
const routes = require('./routes/itemRoutes');


app.listen(PORT, () => {
  console.log(`MicroserviceC listening on port ${PORT}`);
});

app.use(express.json());
app.use("/api",routes);

module.exports = app; // Export the app instance