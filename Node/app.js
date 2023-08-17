const express = require('express');
const app = express();

const PORT = 3000; //define which port to run server(npm run dev)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });