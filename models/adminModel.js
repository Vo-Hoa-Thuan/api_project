const db = require('../config/database');
const bcrypt = require('bcrypt');

// Number of salt rounds for password hashing
const saltRounds = 10;

const Admin = function(admin) {
  // this.sdt = admin.sdt;
  // this.ten_dang_nhap = admin.ten_dang_nhap;
  // this.ho_ten = admin.ho_ten;
  // this.stk = admin.stk;
  // this.ngan_hang = admin.ngan_hang;
  // this.ngay_sinh = admin.ngay_sinh;
  // this.mat_khau = admin.mat_khau;
};

// Insert a new admin
Admin.insertAdmin = (admin, callback) => {
  bcrypt.hash(admin.mat_khau, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error("Hashing Error: ", err);
      return callback(err);
    }

    const sqlString = "INSERT INTO admin SET ?";
    const adminData = { 
      sdt: admin.sdt,
      ten_dang_nhap: admin.ten_dang_nhap,
      ho_ten: admin.ho_ten,
      stk: admin.stk,
      ngan_hang: admin.ngan_hang,
      ngay_sinh: admin.ngay_sinh,
      mat_khau: hashedPassword 
    };

    db.query(sqlString, adminData, (error, results) => {
      if (error) {
        console.error("Database Insert Error: ", error);
        return callback(error);
      }
      callback(null, { id: results.insertId, ...admin });
    });
  });
};

// Update an admin
Admin.updateAdmin = (admin, username, callback) => {
  const sqlString = "UPDATE admin SET sdt = ?, ho_ten = ?, stk = ?, ngan_hang = ?, ngay_sinh = ?, mat_khau = ? WHERE ten_dang_nhap = ?";
  db.query(sqlString, [admin.sdt, admin.ho_ten, admin.stk, admin.ngan_hang, admin.ngay_sinh, admin.mat_khau, username], (error, results) => {
    if (error) return callback(error);
    callback(null, `Cập nhật admin ${username} thành công`);
  });
};

// Delete an admin
Admin.deleteAdmin = (username, callback) => {
  const sqlString = "DELETE FROM admin WHERE ten_dang_nhap = ?";
  db.query(sqlString, username, (error, results) => {
    if (error) return callback(error);
    callback(null, `Xóa admin ${username} thành công`);
  });
};

// Get an admin by username
Admin.getAdmin = (username, callback) => {
    const sqlString = "SELECT sdt, ten_dang_nhap, ho_ten, stk, ngan_hang, ngay_sinh, mat_khau FROM admin WHERE ten_dang_nhap = ?";
  db.query(sqlString, username, (error, results) => {
    if (error) return callback(error);
    if (results.length > 0) {
      callback(null, results[0]);
    } else {
      callback(null, null);
    }
  });
};

// Get all admins
Admin.getAllInAdmin = (callback) => {
    const sqlString = "SELECT sdt, ten_dang_nhap, ho_ten, stk, ngan_hang, ngay_sinh, mat_khau FROM admin";
  db.query(sqlString, (error, results) => {
    if (error) return callback(error);
    callback(null, results);
  });
};

// Check login credentials
Admin.checkLogin = (username, password, callback) => {
  const sqlString = "SELECT * FROM admin WHERE ten_dang_nhap = ?";
  db.query(sqlString, [username], (error, results) => {
    if (error) {
      console.error("Database Query Error: ", error);
      return callback(error);
    }
    if (results.length === 0) {
      // No user found with the given username
      return callback(null, false);
    }

    const hashedPassword = results[0].mat_khau;
    // Compare the hashed password with the provided password
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) {
        console.error("Comparison Error: ", err);
        return callback(err);
      }
      callback(null, result);
    });
  });
};

module.exports = Admin;