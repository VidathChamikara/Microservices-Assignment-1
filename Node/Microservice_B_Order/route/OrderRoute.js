const express = require('express');
const orderController = require('../controller/OrderController'); // Path to OrderController.js

const router = express.Router();

// Define routes
router.get('/getAll', orderController.getOrders);
router.get('/get/:orderId', orderController.getOrderById);
router.post('/create', orderController.createOrder);
router.put('/update/:orderId', orderController.updateOrder);
router.delete('/delete/:orderId', orderController.deleteOrder);

module.exports = router;
