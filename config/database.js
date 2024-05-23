const mysql = require('mysql2');

// Tạo pool connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'db_quanlynhatro',
    waitForConnections: true,
    connectionLimit: 10, // Số lượng kết nối tối đa
    queueLimit: 0 // Số lượng yêu cầu chờ kết nối
});

// Lấy kết nối từ pool
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Lỗi lấy kết nối từ pool: ' + err.stack);
        return;
    }
    console.log('Kết nối đến cơ sở dữ liệu thành công.');

    // Trả kết nối vào pool sau khi sử dụng
    connection.release();
});

module.exports = pool;
