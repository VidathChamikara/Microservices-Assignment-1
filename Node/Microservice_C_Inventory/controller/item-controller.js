const dbConn = require('../dbConnection');

const addItem = (item,cb) => {
    dbConn.getConnection((connection) => {
        connection.query('INSERT INTO item (name,type,price,quantity,enteredBy) VALUES (?,?,?,?,?)', [item.name,item.type,item.price,item.quantity,item.enteredBy], (err, result) => {
            if (err) {
                console.log(err);
            }
            cb(result);
        });
        connection.release();
    });
}

const getAllItems = (cb) => {
    dbConn.getConnection((connection) => {
        connection.query('SELECT * FROM item', (err, result) => {
            if (err) {
                console.log(err);
            }
            cb(result);
        });
        connection.release();
    });
}

const getItem = (id,cb) => {
    dbConn.getConnection((connection) => {
        connection.query('SELECT * FROM item WHERE iditem = ?',[id], (err, result) => {
            if (err) {
                console.log(err);
            }
            cb(result);
        });
        connection.release();
    });
}

const upDateItem = (id,cb) => {
    dbConn.getConnection((connection) => {
        connection.query('SELECT * FROM item WHERE iditem = ?',[id], (err, result) => {
            if (err) {
                console.log(err);
            }
            cb(result);
        });
        connection.release();
    });
}

const updateItem = (id,item,cb) => {
    dbConn.getConnection((connection) => {
        connection.query('UPDATE item SET name = ?,type = ?,price = ?,quantity = ?,enteredBy = ? WHERE iditem = ?', [item.name,item.type,item.price,item.quantity,item.enteredBy,id], (err, result) => {
            if (err) {
                console.log(err);
            }
            cb(result);
        });
        connection.release();
    });
}

const deleteItem = (id,cb) => {
    dbConn.getConnection((connection) => {
        connection.query('DELETE FROM item  WHERE iditem = ?', [id], (err, result) => {
            if (err) {
                console.log(err);
            }
            cb(result);
        });
        connection.release();
    });
}

exports.addItem = addItem;
exports.getAllItems = getAllItems;
exports.getItem = getItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;