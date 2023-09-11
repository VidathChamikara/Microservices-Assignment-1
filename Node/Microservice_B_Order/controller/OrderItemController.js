const sql = require('mssql/msnodesqlv8');
const dbConnection = require('../dbConnection'); // Path to dbConnection.js
const axios = require('axios');

async function getOrderItems(req, res) {
    try {
      const pool = await sql.connect(dbConnection);
      const result = await pool.request().query('SELECT * FROM OrderItems'); // Adjust the query according to your schema
  
      res.json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching orders' });
    }
  }

  async function getOrderItemById(req, res) {
    try {
      const item_id = req.params.itemId; // Change to item_id
      const pool = await sql.connect(dbConnection);
  
      const result = await pool
        .request()
        .input('item_id', sql.Int, item_id) // Change to item_id
        .query(`SELECT * FROM OrderItems WHERE item_id = @item_id;`); // Use correct table name
  
      if (result.recordset.length === 0) {
        res.status(404).json({ message: 'Order item not found' });
      } else {
        res.json(result.recordset[0]);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching order item' });
    }
  }
  
  async function createOrderItem(req, res) {
    try {
      const { order_id, product_id, quantity, unit_price } = req.body;
      const pool = await sql.connect(dbConnection);
  
      // Check if the order exists before creating the order item
      const checkOrderQuery = `SELECT COUNT(*) AS orderCount FROM Orders WHERE order_id = @order_id;`;
      const checkOrderResult = await pool
        .request()
        .input('order_id', sql.Int, order_id)
        .query(checkOrderQuery);
  
      if (checkOrderResult.recordset[0].orderCount === 0) {
        return res.status(404).json({ error: 'Order not found for the given order_id' });
      }
  
      const inventoryUpdateEndpoint = `http://localhost:3003/api/inventory/updateItemQuantity/${product_id}`;
      const inventoryUpdateData = {
        quantity: quantity, // Reduce the quantity in inventory
      };
  
      try {
        // Update inventory
        await axios.patch(inventoryUpdateEndpoint, inventoryUpdateData);
  
        // Calculate subtotal
        const subtotal = quantity * unit_price;
  
        // Inventory update successful, proceed to create the order item
        const insertQuery = `
          INSERT INTO OrderItems (order_id, product_id, quantity, unit_price, subtotal)
          VALUES (@order_id, @product_id, @quantity, @unit_price, @subtotal);
        `;
        await pool
          .request()
          .input('order_id', sql.Int, order_id)
          .input('product_id', sql.Int, product_id) // check the valid product_id according to inventory
          .input('quantity', sql.Int, quantity)
          .input('unit_price', sql.Decimal(10, 2), unit_price)
          .input('subtotal', sql.Decimal(10, 2), subtotal)
          .query(insertQuery);
  
        res.json({ message: 'Order item created successfully' });
      } catch (inventoryError) {
        // If an error occurred during inventory update, handle it and respond accordingly
        console.error(inventoryError);
        res.status(500).json({ error: `Error updating inventory: ${inventoryError.message}` });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Error creating order item: ${error.message}` });
    }
  }
  
  
  
  async function updateOrderItem(req, res) {
    try {
      const item_id = req.params.itemId;
      const { order_id, product_id, quantity, unit_price, subtotal } = req.body;
      const pool = await sql.connect(dbConnection);
  
      // Check if the item exists before attempting to update
      const checkItemQuery = `SELECT COUNT(*) AS itemCount FROM OrderItems WHERE item_id = @item_id;`;
      const checkItemResult = await pool.request().input('item_id', sql.Int, item_id).query(checkItemQuery);
  
      if (checkItemResult.recordset[0].itemCount === 0) {
        return res.status(404).json({ error: 'Order item not found' });
      }
  
      // Check if the associated order exists before updating the item
      const checkOrderQuery = `SELECT COUNT(*) AS orderCount FROM Orders WHERE order_id = @order_id;`;
      const checkOrderResult = await pool.request().input('order_id', sql.Int, order_id).query(checkOrderQuery);
  
      if (checkOrderResult.recordset[0].orderCount === 0) {
        return res.status(404).json({ error: 'Order not found for the given order_id' });
      }
  
      // Update the item
      const updateQuery = `
        UPDATE OrderItems
        SET order_id = @order_id, product_id = @product_id, quantity = @quantity,
            unit_price = @unit_price, subtotal = @subtotal
        WHERE item_id = @item_id;
      `;
      await pool.request()
        .input('order_id', sql.Int, order_id)
        .input('product_id', sql.Int, product_id)
        .input('quantity', sql.Int, quantity)
        .input('unit_price', sql.Decimal(10, 2), unit_price)
        .input('subtotal', sql.Decimal(10, 2), subtotal)
        .input('item_id', sql.Int, item_id)
        .query(updateQuery);
  
      res.json({ message: 'Order item updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating order item' });
    }
  }
  
  
  
  async function deleteOrderItem(req, res) {
    try {
      const item_id = req.params.itemId;
      const pool = await sql.connect(dbConnection);
  
      // Check if the item exists before attempting to delete
      const checkQuery = `SELECT COUNT(*) AS itemCount FROM OrderItems WHERE item_id = @item_id;`;
      const checkResult = await pool.request().input('item_id', sql.Int, item_id).query(checkQuery);
  
      if (checkResult.recordset[0].itemCount === 0) {
        return res.status(404).json({ error: 'Order item not found' });
      }
  
      // Delete the item
      const deleteQuery = `DELETE FROM OrderItems WHERE item_id = @item_id;`;
      await pool.request().input('item_id', sql.Int, item_id).query(deleteQuery);
  
      res.json({ message: 'Order item deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting order item' });
    }
  }
  
  

  module.exports = {
    getOrderItems,
    getOrderItemById,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
  }