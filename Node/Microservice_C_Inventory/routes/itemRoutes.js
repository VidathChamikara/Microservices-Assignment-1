const express = require("express");
const itemController = require('../controller/item-controller');
const Item = require('../model/item-model');

const router = express.Router();
router.post('/addItem',(req,res) => {
    Item.name = req.body.name;
    Item.type = req.body.type;
    Item.price = req.body.price;
    Item.quantity = req.body.quantity;
    Item.enteredBy = req.body.enteredBy;


    if(Item.name && Item.type && Item.price && Item.quantity && Item.enteredBy){
        itemController.addItem(Item,(result) => {  
            res.send({status:200,message:"Item added successfully"});     
    });
    }
    else{
        res.send({status:400,message:"Invalid data"});
    }
    
}) ;

router.get('/getAllItems',(req,res) => {
    itemController.getAllItems((result) => {
        res.send({status:200,data:result});
    });
  });

  router.get('/getItem/:id',(req,res) => {
    const id = req.params.id;
    itemController.getItem(id,(result) => {
        res.send({status:200,data:result});
    });
  });

  router.put('/updateItem/:id',(req,res) => {
    const id = req.params.id;
    Item.name = req.body.name;
    Item.type = req.body.type;
    Item.price = req.body.price;
    Item.quantity = req.body.quantity;
    Item.enteredBy = req.body.enteredBy;

    if(Item.name && Item.type && Item.price && Item.quantity && Item.enteredBy){
        itemController.updateItem(id,Item,(result) => {
            res.send({status:200,data:result});
        });
    }else{
        res.send({status:400,message:"Invalid data"});
    }
    
  });

  router.delete('/deleteItem/:id',(req,res) => {
    const id = req.params.id;
    itemController.deleteItem(id,(result) => {
        res.send({status:200,data:result});
    });
  });

module.exports = router;
 
