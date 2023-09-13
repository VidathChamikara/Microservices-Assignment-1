const express = require("express");
const itemController = require('../controller/item-controller');

const router = express.Router();

router.post('/addItem', itemController.addItem);
router.get('/getAllItems', itemController.getAllItems);
router.get('/getItem/:id', itemController.getItem);
router.get('/getUnitPrice/:product_id', itemController.getUnitPrice);
router.put('/updateItem/:id', itemController.updateItem);
router.patch('/updateItemQuantity/:id', itemController.updateItemQuantity);
router.delete('/deleteItem/:id', itemController.deleteItem);


module.exports = router;
