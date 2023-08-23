const express = require("express");
const itemController = require('../controller/item-controller');

const router = express.Router();

router.post('/addItem', itemController.addItem);
router.get('/getAllItems', itemController.getAllItems);
router.get('/getItem', itemController.getItem);
router.put('/updateItem', itemController.updateItem);
router.delete('/deleteItem', itemController.deleteItem);

module.exports = router;
