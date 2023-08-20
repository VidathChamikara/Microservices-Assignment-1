const express = require('express');
const orderController = require('../controller/OrderController'); // Path to OrderController.js

const router = express.Router();

// Define routes
router.get('/orders', orderController.getOrders);
router.get('/orders/:orderId', orderController.getOrderById);
router.post('/orders', orderController.createOrder);
router.put('/orders/:orderId', orderController.updateOrder);
router.delete('/orders/:orderId', orderController.deleteOrder);

module.exports = router;
