const express = require('express');
const orderItemController = require('../controller/OrderItemController');

const router = express.Router();
// Define routes
router.get('/orderItems', orderItemController.getOrderItems);
router.get('/orderItems/:itemId', orderItemController.getOrderItemById);
router.post('/orderItems', orderItemController.createOrderItem);
router.put('/orderItems/:itemId', orderItemController.updateOrderItem);
router.delete('/orderItems/:itemId', orderItemController.deleteOrderItem);


module.exports = router;