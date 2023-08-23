const sql = require('mssql/msnodesqlv8');

// Define your order schema
const OrderSchema = new sql.Table('Orders', {
  order_id: sql.Int,
  user_id: sql.Int,
  order_date: sql.DateTime,
  total_amount: sql.Decimal(10, 2),
  status: sql.VarChar(20),
  payment_status: sql.VarChar(20),
  shipping_address: sql.VarChar(50),
});

module.exports = OrderSchema;

