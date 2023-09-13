const sql = require('mssql/msnodesqlv8');
const dbConnection = require('../dbConnection'); // Path to dbConnection.js
const OrderSchema = require('../model/OrderSchema'); // Path to OrderSchema.js

// Controller function to fetch orders
async function getOrders(req, res) {
    try {
      const pool = await sql.connect(dbConnection);
      const result = await pool.request().query(`SELECT * FROM ${OrderSchema.name}`); // Adjust the query according to your schema
  
      res.json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching orders' });
    }
  }

// Controller function to get a single order by ID
async function getOrderById(req, res) {
  try {
      const order_id = req.params.orderId;
      const pool = await sql.connect(dbConnection);

      // Modify the SQL query to join Orders and OrderItems tables and filter by order_id
      const query = `
          SELECT
              o.[order_id],
              o.[user_id],
              o.[order_date],
              o.[total_amount],
              o.[status],
              o.[payment_status],
              o.[shipping_address],
              i.[item_id],
              i.[product_id],
              i.[quantity],             
              i.[subtotal]
          FROM [Order].[dbo].[Orders] AS o
          INNER JOIN [Order].[dbo].[OrderItems] AS i ON o.[order_id] = i.[order_id]
          WHERE o.[order_id] = @order_id
      `;

      const result = await pool.request()
          .input('order_id', sql.Int, order_id)
          .query(query);

      if (result.recordset.length === 0) {
          res.status(404).json({ message: 'Order not found' });
      } else {
          // Process the result as needed and send it as a JSON response
          // (similar to the previous response structure)
          // ...

          // Create an object to hold the order details and order items
          const orderDetails = {
              order_id: result.recordset[0].order_id,
              user_id: result.recordset[0].user_id,
              order_date: result.recordset[0].order_date,
              total_amount: result.recordset[0].total_amount,
              status: result.recordset[0].status,
              payment_status: result.recordset[0].payment_status,
              shipping_address: result.recordset[0].shipping_address,
              order_items: [],
          };

          // Iterate through the result set and add order items to the orderDetails object
          result.recordset.forEach((row) => {
              orderDetails.order_items.push({
                  item_id: row.item_id,
                  product_id: row.product_id,
                  quantity: row.quantity,                 
                  subtotal: row.subtotal,
              });
          });

          res.json(orderDetails);
      }
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Error fetching order' });
}
}


// Controller function to create an order
async function createOrder(req, res) {
  try {
    const { user_id, order_date, total_amount, status, payment_status, shipping_address } = req.body;
    const pool = await sql.connect(dbConnection);

    const query = `INSERT INTO ${OrderSchema.name} (user_id, order_date, status, payment_status, shipping_address)
                   VALUES ( @user_id, @order_date, @status, @payment_status, @shipping_address);`;

    const result = await pool.request()
      
      .input('user_id', sql.Int, user_id)//check the user_id acccording user table
      .input('order_date', sql.DateTime, order_date)      
      .input('status', sql.VarChar(20), status)
      .input('payment_status', sql.VarChar(20), payment_status)
      .input('shipping_address', sql.VarChar(50), shipping_address)
      .query(query);

    res.json({ message: 'Order created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating order' });
  }
}
  
  // Controller function to update an order
  async function updateOrder(req, res) {
    try {
      const order_id = req.params.orderId;
      const { user_id, order_date, total_amount, status, payment_status, shipping_address } = req.body;
      const pool = await sql.connect(dbConnection);
  
      // Check if the order exists before attempting to update
      const checkQuery = `SELECT COUNT(*) AS orderCount FROM ${OrderSchema.name} WHERE order_id = @order_id;`;
      const checkResult = await pool.request().input('order_id', sql.Int, order_id).query(checkQuery);
  
      if (checkResult.recordset[0].orderCount === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      // Update the order
      const updateQuery = `
        UPDATE ${OrderSchema.name}
        SET user_id = @user_id, order_date = @order_date, total_amount = @total_amount,
            status = @status, payment_status = @payment_status, shipping_address = @shipping_address
        WHERE order_id = @order_id;
      `;
      await pool.request()
        .input('user_id', sql.Int, user_id)
        .input('order_date', sql.DateTime, order_date)
        .input('total_amount', sql.Decimal(10, 2), total_amount)
        .input('status', sql.VarChar(20), status)
        .input('payment_status', sql.VarChar(20), payment_status)
        .input('shipping_address', sql.VarChar(50), shipping_address)
        .input('order_id', sql.Int, order_id)
        .query(updateQuery);
  
      res.json({ message: 'Order updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating order' });
    }
  }
   
  
  // Controller function to delete an order
  async function deleteOrder(req, res) {
    try {
      const order_id = req.params.orderId;
      const pool = await sql.connect(dbConnection);
  
      // Check if the order exists before attempting to delete
      const checkQuery = `SELECT COUNT(*) AS orderCount FROM ${OrderSchema.name} WHERE order_id = @order_id;`;
      const checkResult = await pool.request().input('order_id', sql.Int, order_id).query(checkQuery);
  
      if (checkResult.recordset[0].orderCount === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      // Delete the order
      const deleteQuery = `DELETE FROM ${OrderSchema.name} WHERE order_id = @order_id;`;
      await pool.request().input('order_id', sql.Int, order_id).query(deleteQuery);
  
      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting order' });
    }
  }
  
  
  module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
  };
  