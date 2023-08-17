const express = require('express');
const app = express();
const microserviceA = require('./Microservice_A_User/app');
const microserviceB = require('./Microservice_B_Order/app');
const microserviceC = require('./Microservice_C_Inventory/app');

const PORT = 3000; // Define which port to run the server (npm run dev)

// Start MicroserviceA, MicroserviceB, and MicroserviceC
app.use('/microserviceA', microserviceA);
app.use('/microserviceB', microserviceB);
app.use('/microserviceC', microserviceC);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
