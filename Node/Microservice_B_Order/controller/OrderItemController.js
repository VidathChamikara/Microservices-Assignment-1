const sql = require('mssql/msnodesqlv8');
const dbConnection = require('../dbConnection'); // Path to dbConnection.js


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
      const { order_id, product_id, quantity, unit_price, subtotal } = req.body;
      const pool = await sql.connect(dbConnection);
  
      const query = `
        INSERT INTO OrderItems (order_id, product_id, quantity, unit_price, subtotal)
        VALUES (@order_id, @product_id, @quantity, @unit_price, @subtotal);
      `;
  
      const result = await pool.request()
        .input('order_id', sql.Int, order_id)
        .input('product_id', sql.Int, product_id)
        .input('quantity', sql.Int, quantity)
        .input('unit_price', sql.Decimal(10, 2), unit_price)
        .input('subtotal', sql.Decimal(10, 2), subtotal)
        .query(query);
  
      res.json({ message: 'Order item created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating order item' });
    }
  }
  
  async function updateOrderItem(req, res) {
    try {
      const item_id = req.params.itemId;  // Assuming you're using item_id as the identifier
      const { order_id, product_id, quantity, unit_price, subtotal } = req.body;
      const pool = await sql.connect(dbConnection);
      
      const query = `
        UPDATE OrderItems
        SET order_id = @order_id, product_id = @product_id, quantity = @quantity,
            unit_price = @unit_price, subtotal = @subtotal
        WHERE item_id = @item_id;
      `;
  
      const result = await pool.request()
        .input('order_id', sql.Int, order_id)
        .input('product_id', sql.Int, product_id)
        .input('quantity', sql.Int, quantity)
        .input('unit_price', sql.Decimal(10, 2), unit_price)
        .input('subtotal', sql.Decimal(10, 2), subtotal)
        .input('item_id', sql.Int, item_id)
        .query(query);
  
      res.json({ message: 'Order item updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating order item' });
    }
  }
  
  async function deleteOrderItem(req, res) {
    try {
      const item_id = req.params.itemId;  // Assuming you're using item_id as the identifier
      const pool = await sql.connect(dbConnection);
      
      const result = await pool.request().input('item_id', sql.Int, item_id)
        .query(`DELETE FROM OrderItems WHERE item_id = @item_id;`);
  
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