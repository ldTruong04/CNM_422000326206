const mysql = require('mysql2');

// Tạo connection pool để tối ưu hiệu suất
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3307,      // 🔹 THÊM DÒNG NÀY: dùng port 3307
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'shopdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export promise-based API để dùng async/await
module.exports = pool.promise();