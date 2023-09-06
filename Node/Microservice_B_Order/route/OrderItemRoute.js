const express = require('express');
const orderItemController = require('../controller/OrderItemController');

const router = express.Router();
// Define routes
router.get('/getAll', orderItemController.getOrderItems);
router.get('/get/:itemId', orderItemController.getOrderItemById);
router.post('/create', orderItemController.createOrderItem);
router.put('/update/:itemId', orderItemController.updateOrderItem);
router.delete('/delete/:itemId', orderItemController.deleteOrderItem);


module.exports = router;