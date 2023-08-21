const dbConn = require('../dbConnection');
const Item = require('../model/item-model');

var id = 0;
var name = Item.name;
var type = Item.type;
var price = Item.price;
var quantity = Item.quantity;
var enteredBy = Item.enteredBy;

const addItem = (req, res) => {
    name = req.body.name;
    type = req.body.type;
    price = req.body.price;
    quantity = req.body.quantity;
    enteredBy = req.body.enteredBy;

    if (name && type && price && quantity && enteredBy) {
        dbConn.getConnection((connection) => {
            connection.query('INSERT INTO item (name,type,price,quantity,enteredBy) VALUES (?,?,?,?,?)', [name, type, price, quantity, enteredBy], (err, result) => {
                if (err) {
                    console.log(err);
                }
            });
            connection.release();
        });
        res.send({ status: 200, message: "Item added successfully" });
    }
    else {
        res.send({ status: 400, message: "Invalid data" });
    }

}


const getAllItems = (req, res) => {
    dbConn.getConnection((connection) => {
        connection.query('SELECT * FROM item', (err, result) => {
            if (err) {
                console.log(err);
            }else{
                res.send({ status: 200, data: result });
            } 
        });
        connection.release();
    });
}

const getItem = (req, res) => {
    id = req.query.id;
    dbConn.getConnection((connection) => {
        connection.query('SELECT * FROM item WHERE iditem = ?', [id], (err, result) => {
            if (err) {
                console.log(err);
            }else{
                res.send({ status: 200, data: result });
            }
        });
        connection.release();
    });
}


const updateItem = (req, res) => {
    id = req.body.iditem;
    name = req.body.name;
    type = req.body.type;
    price = req.body.price;
    quantity = req.body.quantity;
    enteredBy = req.body.enteredBy;
    if (id && name && type && price && quantity && enteredBy) {
    dbConn.getConnection((connection) => {
        connection.query('UPDATE item SET name = ?,type = ?,price = ?,quantity = ?,enteredBy = ? WHERE iditem = ?', [name, type, price, quantity, enteredBy, id], (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send({ status: 200, data: result });
        });
        connection.release();
    });}
    else {
        res.send({ status: 400, message: "Invalid data" });
    }
}

const deleteItem = (req,res) => {
    id = req.query.id;
    dbConn.getConnection((connection) => {
        connection.query('DELETE FROM item  WHERE iditem = ?', [id], (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send({ status: 200, data: result });
        });
        connection.release();
    });
}

exports.addItem = addItem;
exports.getAllItems = getAllItems;
exports.getItem = getItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;