const db = require('../config/database');

const KhuTro = function(khuTro) {
  // this.ma_khu_tro = khuTro.ma_khu_tro;
  // this.ten_khu_tro = khuTro.ten_khu_tro;
  // this.dia_chi = khuTro.dia_chi;
  // this.so_luong_phong = khuTro.so_luong_phong;
  // this.ten_dang_nhap = khuTro.ten_dang_nhap;
};

KhuTro.insert = (khuTro, callback) => {
  const sqlString = "INSERT INTO khutro SET ?";
  db.query(sqlString, khuTro, (err, res) => {
    if (err) {
      callback(err);
      return;
    }
    const maKhuTro = res.insertId;
    callback(null, { id: maKhuTro, ...khuTro });
  });
};

KhuTro.update = (khuTro, id, callback) => {
  const sqlString = "UPDATE khutro SET ? WHERE ma_khu_tro = ?";
  db.query(sqlString, [khuTro, id], (err, res) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, `Cập nhật khu trọ ID = ${id} thành công`);
  });
};

KhuTro.delete = (id, callback) => {
  const sqlString = "DELETE FROM khutro WHERE ma_khu_tro = ?";
  db.query(sqlString, id, (err, res) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, `Xóa khu trọ ID = ${id} thành công`);
  });
};

KhuTro.getById = (id, callback) => {
  const sqlString = "SELECT * FROM khutro WHERE ma_khu_tro = ?";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
};

KhuTro.getAll = (callback) => {
  const sqlString = "SELECT * FROM khutro";
  db.query(sqlString, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
};

KhuTro.getAllInKhuTroByAdmin = (username, callback) => {
  const sqlString = "SELECT * FROM khutro WHERE ten_dang_nhap = ?";
  db.query(sqlString, username, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
};

KhuTro.getTenKhuTro = (zzcallback) => {
  const sqlString = "SELECT ten_khu_tro FROM khutro";
  db.query(sqlString, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    const names = result.map(row => row.ten_khu_tro);
    callback(null, names);
  });
};

module.exports = KhuTro;